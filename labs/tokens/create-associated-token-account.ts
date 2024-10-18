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
const tokenMintAccount = new PublicKey("YOUR_TOKEN_MINT_HERE");

// Substitute in your classmate's wallet address here
const recipient = new PublicKey("YOUR_CLASSMATES_WALLET_ACCOUNT_HERE");

console.log(
  `⏳ Creating associated token account for token ${tokenMintAccount.toBase58()} for wallet ${recipient.toBase58()}...`
);

const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient,
  false,
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);

console.log(
  `Associated token Account: ${associatedTokenAccount.address.toBase58()}`
);

const link = getExplorerLink(
  "address",
  associatedTokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Success! Created associated token Account: ${link}`);
