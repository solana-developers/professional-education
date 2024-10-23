pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("37uSAiGHHfyHifwAKSiBkkby5mVLm3jChb5ohH9anNKk");

#[program]
pub mod lending {
    use super::*;

    pub fn initialize_bank(
        context: Context<InitializeBank>,
        liquidation_threshhold: u64,
        max_liquidation_to_value: u64,
    ) -> Result<()> {
        initialize_bank::initialize_bank_handler(
            context,
            liquidation_threshhold,
            max_liquidation_to_value,
        )
    }

    pub fn initialize_user(context: Context<InitializeUser>, usdc_mint: Pubkey) -> Result<()> {
        initialize_user::initialize_user_handler(context, usdc_mint)
    }
}
