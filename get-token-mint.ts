import * as token from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const MINT_ADDRESS = getKeypairFromEnvironment("MINT_ACCOUNT");

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

const connection = new Connection(clusterApiUrl("devnet"));

const mintInfo = await token.getMint(connection, MINT_ADDRESS.publicKey);

// Make BigInts JSON serializable
// See https://github.com/GoogleChromeLabs/jsbi/issues/30
// @ts-ignore
BigInt.prototype.toJSON = function (): number {
  return this.toString();
};

console.log(`✅ Mint Info: ${JSON.stringify(mintInfo, null, 2)}`);
