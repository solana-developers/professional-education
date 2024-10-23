use anchor_lang::prelude::*;

pub const ANCHOR_DISCRIMINATOR: usize = 8;

#[account]
#[derive(InitSpace)]
pub struct User {
    // Was 'owner' in the Bri's code
    // But Solana uses 'owner' for programs
    // and 'authority' for people.
    pub authority: Pubkey,
    // Ina real program we should
    pub deposited_sol: u64,
    pub deposited_sol_shares: u64,

    pub borrowed_sol: u64,
    pub borrowed_sol_shares: u64,

    pub deposited_usdc: u64,
    pub deposited_usdc_shares: u64,

    pub borrowed_usdc: u64,
    pub borrowed_usdc_shares: u64,

    // Was usdc_address in Bri's code
    pub usdc_mint: Pubkey,
    // Was i64 in Bri's code
    // But timestamps are unsigned (they can't be negative)
    // unless we want updates from before the Unix epoch.
    pub last_updated: u64,
}

#[account]
#[derive(InitSpace)]
pub struct Bank {
    pub authority: Pubkey,
    // Was 'mint_address' in Bri's code
    pub mint: Pubkey,

    pub total_deposits: u64,
    pub total_deposit_shares: u64,

    // Loan to value after which a loan is defined as undercollatwerialized
    pub liquidation_threshold: u64,
    // Percentage of the liquidation sent to liquidator for processing liquidation
    pub liquidation_bonus: u64,

    // Percentage of collateral that can be liquidated
    pub liquidation_close_factor: u64,

    // Max percentage of collateral that can be borrowed for a specific asset
    // Was 'max_ltv' in Bri's code
    pub max_liquidation_to_value: u64,

    // Was i64 in Bri's code
    pub last_updated: u64,
}
