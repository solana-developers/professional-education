use anchor_lang::prelude::*;

use crate::{User, ANCHOR_DISCRIMINATOR};

// Was process_init_user in Bri's code
pub fn initialize_user_handler(context: Context<InitializeUser>, usdc_mint: Pubkey) -> Result<()> {
    let user = &mut context.accounts.user;
    user.authority = context.accounts.signer.key();
    user.usdc_mint = usdc_mint;
    Ok(())
}

// 2735

// Was InitUser in Bri's code
#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = ANCHOR_DISCRIMINATOR + User::INIT_SPACE,
        seeds = [signer.key().as_ref()],
        bump
    )]
    // Was 'user_account' in Bri's code
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}
