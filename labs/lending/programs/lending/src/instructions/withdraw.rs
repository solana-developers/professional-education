use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{self, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::error::ErrorCode;

use crate::{Bank, User};
#[derive(Accounts)]
pub struct Withdraw<'info> {
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

    #[account(
        mut,
        seeds = [signer.key().as_ref()],
        bump
    )]
    pub user: Account<'info, User>,

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = mint,
        associated_token::authority = signer,
        associated_token::token_program = token_program
    )]
    pub user_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn withdraw_handler(context: Context<Withdraw>, amount: u64) -> Result<()> {
    let user = &mut context.accounts.user;

    // Check if the user has deposited enough funds to withdraw
    let deposited_value;
    if context.accounts.mint.to_account_info().key() == user.usdc_token_account {
        deposited_value = user.deposited_usdc;
    } else {
        deposited_value = user.deposited_sol;
    }

    // Calulate interest rate
    // user will have deposited their funds
    // but we need to calculate the interest rate on their deposits
    // to calculate the amount they can withdraw
    let time_difference = user.last_updated - Clock::get()?.unix_timestamp;

    // if amount > deposited_value {
    //     return Err(ErrorCode::InsufficientFunds.into());
    // }

    // Transfer from the bank's token account into the user's token account
    let transfer_cpi_accounts = TransferChecked {
        from: context.accounts.bank_token_account.to_account_info(),
        to: context.accounts.user_token_account.to_account_info(),
        authority: context.accounts.bank_token_account.to_account_info(),
        mint: context.accounts.mint.to_account_info(),
    };
    let cpi_program = context.accounts.token_program.to_account_info();
    let mint_key = context.accounts.mint.key();
    // An array of signers
    let signer_seeds: &[&[&[u8]]] = &[
        // Our first signer, as an array of seeds
        &[
            // Each seed is a byte array
            b"treasury",
            mint_key.as_ref(),
            &[context.bumps.bank_token_account],
        ],
    ];

    let cpi_context = CpiContext::new(cpi_program, transfer_cpi_accounts).with_signer(signer_seeds);
    let decimals = context.accounts.mint.decimals;
    token_interface::transfer_checked(cpi_context, amount, decimals)?;

    // Update the state of the user and the bank to reflect the token transfer
    let bank: &mut Account<'_, Bank> = &mut context.accounts.bank;
    // TODO: why is this a f64?
    let shares_to_remove =
        (amount as f64 / bank.total_deposits as f64) * bank.total_deposit_shares as f64;

    let user = &mut context.accounts.user;

    if context.accounts.mint.to_account_info().key() == user.usdc_token_account {
        user.deposited_usdc -= amount;
        user.deposited_usdc_shares -= shares_to_remove as u64;
    } else {
        user.deposited_sol -= amount;
        user.deposited_sol_shares -= shares_to_remove as u64;
    }

    bank.total_deposits -= amount;
    bank.total_deposit_shares -= shares_to_remove as u64;

    Ok(())
}
