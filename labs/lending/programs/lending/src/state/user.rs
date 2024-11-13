use anchor_lang::prelude::*;

// Naming is bad here.
// Bri's code called this user_account
// but someone's own wallet could be considered their user account.
// maybe user_settings? or similar?
#[account]
#[derive(InitSpace)]
pub struct User {
    // Was 'owner' in the Bri's code
    // But Solana uses 'owner' for programs
    // and 'authority' for people.
    pub wallet: Pubkey,
    // Ina real program we should
    pub deposited_sol: u64,
    pub deposited_sol_shares: u64,

    pub borrowed_sol: u64,
    pub borrowed_sol_shares: u64,

    pub deposited_usdc: u64,
    pub deposited_usdc_shares: u64,

    pub borrowed_usdc: u64,
    pub borrowed_usdc_shares: u64,

    // USDC account address
    // Was usdc_address in Bri's code but that sounds like the USDC mint address
    pub usdc_token_account: Pubkey,

    pub last_updated: i64,
}
