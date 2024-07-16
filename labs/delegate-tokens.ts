import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  approve,
  getOrCreateAssociatedTokenAccount,
  revoke,
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// Add the delegate public key here.
const delegate = new PublicKey("YOUR_DELEGATE_HERE");

// Substitute in your token mint account
const tokenMintAccount = new PublicKey("YOUR_TOKEN_MINT_ADDRESS_HERE");

// Get the account where the user stores these tokens
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey
);

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const approveTransactionSignature = await approve(
  connection,
  user,
  sourceTokenAccount.address,
  delegate,
  user.publicKey,
  50 * MINOR_UNITS_PER_MAJOR_UNITS
);

console.log(
  `Approve Delegate Transaction: ${getExplorerLink(
    "transaction",
    approveTransactionSignature,
    "devnet"
  )}`
);

const revokeTransactionSignature = await revoke(
  connection,
  user,
  delegate,
  user.publicKey
);

console.log(
  `Revoke Delegate Transaction: ${getExplorerLink(
    "transaction",
    revokeTransactionSignature,
    "devnet"
  )}`
);
