use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::{Offer, ANCHOR_DISCRIMINATOR};

// See https://www.anchor-lang.com/docs/account-constraints#instruction-attribute
#[derive(Accounts)]
#[instruction(id: u64)]
pub struct MakeOffer<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,

    #[account(mint::token_program = token_program)]
    pub offered_token_mint: InterfaceAccount<'info, Mint>,

    #[account(mint::token_program = token_program)]
    pub wanted_token_mint: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = offered_token_mint,
        associated_token::authority = maker,
        associated_token::token_program = token_program
    )]
    pub maker_offered_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init,
        payer = maker,
        space = ANCHOR_DISCRIMINATOR + Offer::INIT_SPACE,
        seeds = [b"offer", maker.key().as_ref(), id.to_le_bytes().as_ref()],
        bump
    )]
    pub offer: Account<'info, Offer>,

    #[account(
        init,
        payer = maker,
        associated_token::mint = offered_token_mint,
        associated_token::authority = offer,
        associated_token::token_program = token_program
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    context: Context<MakeOffer>,
    id: u64,
    offered_amount: u64,
    wanted_amount: u64,
) -> Result<()> {
    send_offered_tokens_to_vault(&context, offered_amount)?;
    save_offer(context, id, wanted_amount)
}

// Move the tokens from the maker's ATA to the vault
pub fn send_offered_tokens_to_vault(
    context: &Context<MakeOffer>,
    offered_amount: u64,
) -> Result<()> {
    let transfer_accounts = TransferChecked {
        from: context
            .accounts
            .maker_offered_token_account
            .to_account_info(),
        mint: context.accounts.offered_token_mint.to_account_info(),
        to: context.accounts.vault.to_account_info(),
        authority: context.accounts.maker.to_account_info(),
    };

    let cpi_context = CpiContext::new(
        context.accounts.token_program.to_account_info(),
        transfer_accounts,
    );

    transfer_checked(
        cpi_context,
        offered_amount,
        context.accounts.offered_token_mint.decimals,
    )
}

// Save the details of the offer to the offer account
pub fn save_offer(context: Context<MakeOffer>, id: u64, wanted_amount: u64) -> Result<()> {
    context.accounts.offer.set_inner(Offer {
        id,
        maker: context.accounts.maker.key(),
        offered_token_mint: context.accounts.offered_token_mint.key(),
        wanted_token_mint: context.accounts.wanted_token_mint.key(),
        wanted_amount,
        bump: context.bumps.offer,
    });
    Ok(())
}
