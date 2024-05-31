pub mod constants;
pub mod error;
pub mod handlers;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use handlers::*;
pub use state::*;

declare_id!("qbuMdeYxYJXBjU6C6qFKjZKjXmrU83eDQomHdrch826");

#[program]
pub mod escrow {
    use super::*;

    pub fn make_offer(
        context: Context<MakeOffer>,
        id: u64,
        offered_amount: u64,
        wanted_amount: u64,
    ) -> Result<()> {
        handlers::make_offer::send_offered_tokens_to_vault(&context, offered_amount)?;
        handlers::make_offer::save_offer(context, id, wanted_amount)
    }

    pub fn take_offer(context: Context<TakeOffer>) -> Result<()> {
        handlers::take_offer::send_wanted_tokens_to_maker(&context)?;
        handlers::take_offer::withdraw_and_close_vault(context)
    }
}
