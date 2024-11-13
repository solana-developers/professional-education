import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// mintTo() doesn't default to a commitment level (unlike, say, sendAndConfirmTransaction() ), so we need to specify it
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Our token has two decimal places
// Must match create-token-mint.ts
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("YOUR_TOKEN_MINT_HERE");

// Let's mint the tokens to ourselves for now!
const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey,
  false,
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);

const transactionSignature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount.address,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS,
  [],
  {},
  TOKEN_2022_PROGRAM_ID
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);
