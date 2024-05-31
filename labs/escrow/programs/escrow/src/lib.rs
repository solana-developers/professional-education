pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
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
        make_offer::handler(context, id, offered_amount, wanted_amount)
    }

    pub fn take_offer(context: Context<TakeOffer>) -> Result<()> {
        take_offer::handler(context)
    }
}
