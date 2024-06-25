// Adapted from https://github.com/Unboxed-Software/solana-ping-client

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const CLUSTER_NAME = "devnet";

const PING_PROGRAM_ADDRESS = new PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PING_PROGRAM_DATA_ADDRESS = new PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

dotenv.config();

const payer = getKeypairFromEnvironment("SECRET_KEY");
console.log(`🔑 Loaded keypair ${payer.publicKey.toBase58()}!`);

const connection = new Connection(clusterApiUrl(CLUSTER_NAME));
console.log(`⚡️ Connected to Solana ${CLUSTER_NAME} cluster!`);

// Note: may not work first time as `await` returns before Lamports are confirmed.
// Being fixed in https://github.com/solana-labs/solana-web3.js/issues/1579
await connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL * 1);
console.log(`💸 Got some ${CLUSTER_NAME} lamports!`);

const transaction = new Transaction();

const programId = new PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new TransactionInstruction({
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId,
});

transaction.add(instruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  payer,
]);

console.log(
  `✅ Transaction completed! You can view your transaction on the Solana Explorer at:`
);
console.log(
  `https://explorer.solana.com/tx/${signature}?cluster=${CLUSTER_NAME}`
);
