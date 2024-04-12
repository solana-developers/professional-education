import { createAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

const mintAccount = getKeypairFromEnvironment("MINT_ACCOUNT");

// Subtitute in your classmate's wallet address here
const recipient = new PublicKey("Hxsgo2tPiu6967VUaEquk232riDKkaqK89wBvdSCgjH7");

// This is also a helper function that builds and runs the transaction for us
const associatedTokenAccount = await createAssociatedTokenAccount(
  connection,
  sender,
  mintAccount.publicKey,
  recipient
);

const explorerLink = getExplorerLink(
  "address",
  associatedTokenAccount.toString(),
  "devnet"
);

console.log(
  `✅ Created associated token account, explorer link is: ${explorerLink}!`
);
