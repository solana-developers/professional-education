use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Offer {
    pub id: u64,
    pub maker: Pubkey,
    pub offered_token_mint: Pubkey,
    pub wanted_token_mint: Pubkey,
    pub wanted_amount: u64,
    pub bump: u8,
}
