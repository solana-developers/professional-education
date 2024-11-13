use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token_interface::{self, Mint, TokenAccount, TokenInterface, TransferChecked}};

use crate::{Bank, User};

// Deposit funds from user_token_account into the bank so users can borrow against them.
#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub mint: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        seeds = [mint.key().as_ref()],
        bump,
    )]
    pub bank: Account<'info, Bank>,

    #[account(
        mut,
        seeds = [b"treasury", mint.key().as_ref()],
        bump
    )]
    pub bank_token_account: InterfaceAccount<'info, TokenAccount>,

    // Was user_account
    #[account(
        mut,
        seeds = [signer.key().as_ref()],
        bump
    )]
    pub user: Account<'info, User>,

    #[account(
        mut, 
        associated_token::mint = mint, 
        associated_token::authority = signer, 
        associated_token::token_program = token_program
    )]
    pub user_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

// Was 'process_deposit' in Bri's code
pub fn deposit_handler(context: Context<Deposit>, amount: u64, ) -> Result<()> {
    // Transfer from the users token account into the bank's token account
    let transfer_cpi_accounts = TransferChecked {
        from: context.accounts.user_token_account.to_account_info(),
        to: context.accounts.bank_token_account.to_account_info(),
        authority: context.accounts.signer.to_account_info(),
        mint: context.accounts.mint.to_account_info(),
    };
    let cpi_program = context.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new(cpi_program, transfer_cpi_accounts);
    let decimals = context.accounts.mint.decimals;
    token_interface::transfer_checked(cpi_context, amount, decimals)?;

    // Calculate the new shares to be added to the bank
    // Update the user's deposit and colateral amount
    let bank = &mut context.accounts.bank;

    // Set some bank values if they are not set
    // To avoid potential divide by zero errors
    if bank.total_deposits == 0  {
        bank.total_deposits = amount;
        bank.total_deposit_shares = amount;
    }
    
    // deposit ration = deposit amount / total deposits
    let deposit_ratio = amount.checked_div(bank.total_deposits).unwrap();

    // User shares = total deposit shares * deposit ratio
    let user_shares = bank.total_deposit_shares.checked_mul(deposit_ratio).unwrap();

    let user = &mut context.accounts.user;

    match context.accounts.mint.to_account_info().key() {
        key if key == user.usdc_token_account => {
            user.deposited_usdc += amount;
            user.deposited_usdc_shares += user_shares;
        },
        // Otherwise this is SOL
        _ => {
            user.deposited_sol += amount;
            user.deposited_sol_shares += user_shares;
        }
    }

    // Update the bank state
    bank.total_deposits += amount;
    bank.total_deposit_shares += user_shares;

    // Update the last_updated - we need this for calaculating interest!
    user.last_updated = Clock::get()?.unix_timestamp;

    Ok(())
}