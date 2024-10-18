import {
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "9vrkZjCuukcfC9jZ3UGtf3GjUtWet6ZbkxDJqtf9WyvJ"
);

// Substitute in your classmate's wallet address here
const recipient = new PublicKey("5JhJhCj5yXhnZxtPRUvAnzGBfQNJhY2js4HoLVXzBTmG");

console.log(`⏳ Creating associated token account...`);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient,
  false,
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Success! Created associated token Account: ${link}`);
