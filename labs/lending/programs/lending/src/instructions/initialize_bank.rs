use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenAccount, TokenInterface};

use crate::{Bank, ANCHOR_DISCRIMINATOR};

// Was InitBank in Bri's code
#[derive(Accounts)]
pub struct InitializeBank<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub mint: InterfaceAccount<'info, Mint>,

    #[account(
        init, 
        payer = signer, 
        space = ANCHOR_DISCRIMINATOR + Bank::INIT_SPACE,
        seeds = [mint.key().as_ref()],
        bump
    )]
    pub bank: Account<'info, Bank>,

    // TODO: Might want to rename to treasury
    #[account(
        init,
        token::mint = mint,
        token::authority = bank_token_account,
        payer = signer,
        seeds = [b"treasury", mint.key().as_ref()],
        bump
    )]
    pub bank_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}


// Was process_init_bank in Bri's code
pub fn initialize_bank_handler(
    context: Context<InitializeBank>,
    liquidation_threshhold: u64,
    max_liquidation_to_value: u64,
) -> Result<()> {
    let bank = &mut context.accounts.bank;
    bank.mint = context.accounts.mint.key();
    bank.authority = context.accounts.signer.key();
    bank.liquidation_threshold = liquidation_threshhold;
    bank.max_liquidation_to_value = max_liquidation_to_value;
    // TODO: why is this a u64?
    // "When you cast a float to an integer type like u64, Rust performs a truncation, meaning it simply chops off the decimal part. So, 0.05 as u64 becomes 0."
    bank.interest_rate = 0.05 as u64;
    Ok(())
}
