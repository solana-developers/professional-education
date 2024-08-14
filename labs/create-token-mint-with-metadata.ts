// Adapted from https://github.com/solana-labs/solana-program-library/blob/master/token/js/examples/metadata.ts
import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import type { TokenMetadata } from "@solana/spl-token-metadata";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const mint = Keypair.generate();
const decimals = 9;

const metadata: TokenMetadata = {
  mint: mint.publicKey,
  name: "Solana training token",
  symbol: "TRAINING",
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-token-metadata.json",
  additionalMetadata: [["new-field", "new-value"]],
};

// Work out how much SOL we need to store our Token
const mintLength = getMintLen([ExtensionType.MetadataPointer]);
const metadataLength = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
const mintLamports = await connection.getMinimumBalanceForRentExemption(
  mintLength + metadataLength
);

// make instructtons to:
// - create the mint account,
// - write the dnecessary data for metadata pointer,
// - initialize the
const mintTransaction = new Transaction().add(
  SystemProgram.createAccount({
    fromPubkey: user.publicKey,
    newAccountPubkey: mint.publicKey,
    space: mintLength,
    lamports: mintLamports,
    programId: TOKEN_2022_PROGRAM_ID,
  }),
  createInitializeMetadataPointerInstruction(
    mint.publicKey,
    user.publicKey,
    mint.publicKey,
    TOKEN_2022_PROGRAM_ID
  ),
  createInitializeMintInstruction(
    mint.publicKey,
    decimals,
    user.publicKey,
    null,
    TOKEN_2022_PROGRAM_ID
  ),
  createInitializeInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    mint: mint.publicKey,
    metadata: mint.publicKey,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    mintAuthority: user.publicKey,
    updateAuthority: user.publicKey,
  })
);
const signature = await sendAndConfirmTransaction(connection, mintTransaction, [
  user,
  mint,
]);

const link = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Success! Created token mint: ${link}`);
