import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
  addKeypairToEnvFile,
} from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  Transaction,
  clusterApiUrl,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

const transaction = new Transaction();

const mintAccount = getKeypairFromEnvironment("MINT_ACCOUNT");

const lamports = await getMinimumBalanceForRentExemptMint(connection);

// Create an account to store the mint
const createAccountInstruction = SystemProgram.createAccount({
  fromPubkey: sender.publicKey,
  newAccountPubkey: mintAccount.publicKey,
  space: MINT_SIZE,
  lamports,
  programId: TOKEN_PROGRAM_ID,
});

transaction.add(createAccountInstruction);

const initializeMintInstruction = createInitializeMintInstruction(
  mintAccount.publicKey,
  2,
  keypair.publicKey,
  keypair.publicKey,
  TOKEN_PROGRAM_ID
);

transaction.add(initializeMintInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
  mintAccount,
]);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);
