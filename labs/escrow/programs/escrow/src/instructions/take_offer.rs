use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        close_account, transfer_checked, CloseAccount, Mint, TokenAccount, TokenInterface,
        TransferChecked,
    },
};

use crate::Offer;

#[derive(Accounts)]
pub struct TakeOffer<'info> {
    #[account(mut)]
    pub taker: Signer<'info>,

    #[account(mut)]
    pub maker: SystemAccount<'info>,

    pub offered_token_mint: InterfaceAccount<'info, Mint>,

    pub wanted_token_mint: InterfaceAccount<'info, Mint>,

    #[account(
        init_if_needed,
        payer = taker,
        associated_token::mint = offered_token_mint,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_offered_token_account: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = wanted_token_mint,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_wanted_token_account: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = taker,
        associated_token::mint = wanted_token_mint,
        associated_token::authority = maker,
        associated_token::token_program = token_program,
    )]
    pub maker_wanted_token_account: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,
        close = maker,
        has_one = maker,
        has_one = offered_token_mint,
        has_one = wanted_token_mint,
        seeds = [b"offer", maker.key().as_ref(), offer.id.to_le_bytes().as_ref()],
        bump = offer.bump
    )]
    offer: Account<'info, Offer>,

    #[account(
        mut,
        associated_token::mint = offered_token_mint,
        associated_token::authority = offer,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

pub fn send_wanted_tokens_to_maker(ctx: &Context<TakeOffer>) -> Result<()> {
    let transfer_accounts = TransferChecked {
        from: ctx.accounts.taker_wanted_token_account.to_account_info(),
        mint: ctx.accounts.wanted_token_mint.to_account_info(),
        to: ctx.accounts.maker_wanted_token_account.to_account_info(),
        authority: ctx.accounts.taker.to_account_info(),
    };

    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        transfer_accounts,
    );

    transfer_checked(
        cpi_ctx,
        ctx.accounts.offer.wanted_amount,
        ctx.accounts.wanted_token_mint.decimals,
    )
}

pub fn withdraw_and_close_vault(ctx: Context<TakeOffer>) -> Result<()> {
    let signer_seeds: [&[&[u8]]; 1] = [&[
        b"offer",
        ctx.accounts.maker.to_account_info().key.as_ref(),
        &ctx.accounts.offer.id.to_le_bytes()[..],
        &[ctx.accounts.offer.bump],
    ]];

    let accounts = TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        mint: ctx.accounts.offered_token_mint.to_account_info(),
        to: ctx.accounts.taker_offered_token_account.to_account_info(),
        authority: ctx.accounts.offer.to_account_info(),
    };

    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        accounts,
        &signer_seeds,
    );

    transfer_checked(
        cpi_context,
        ctx.accounts.vault.amount,
        ctx.accounts.offered_token_mint.decimals,
    )?;

    let accounts = CloseAccount {
        account: ctx.accounts.vault.to_account_info(),
        destination: ctx.accounts.taker.to_account_info(),
        authority: ctx.accounts.offer.to_account_info(),
    };

    let cpi_context = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        accounts,
        &signer_seeds,
    );

    close_account(cpi_context)
}
