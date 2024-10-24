use anchor_lang::prelude::*;

// State for a bank, recording where tokens are deposited and borrowed from.
// One bank is created for each token that can be deposited and borrowed.
// Maybe 'vault' would be a better name than 'bank'.
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

    pub interest_rate: u64,

    pub last_updated: i64,
}
