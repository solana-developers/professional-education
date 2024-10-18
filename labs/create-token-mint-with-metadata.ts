import "dotenv/config";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromEnvironment,
  makeTokenMint,
} from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const mintAuthority = user;

await airdropIfRequired(
  connection,
  mintAuthority.publicKey,
  100 * LAMPORTS_PER_SOL,
  1 * LAMPORTS_PER_SOL
);

// TODO: what name and symbol are used in explorer, the one from the mint or the one from the metadata?
// Remove whatever is not used
// ANSWER: name from json metadata is used in explorer
// what happens if we remove it? Unknown token
// TODO: push to github and see what happens
const name = "Developer Education";
const symbol = "EDU";
const decimals = 9;
const uri =
  "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-token-metadata.json";

const additionalMetadata = {
  shlerm: "frobular",
  glerp: "flerpy",
  gurperderp: "erpy",
  nurmagerd: "flerpy",
  zurp: "flerpy",
  eruper: "flerpy",
  zerperurperserp: "flerpy",
  zherp: "flerpy",
};

console.log(`⏳ Creating token mint with metadata...`);
const mintAddress = await makeTokenMint(
  connection,
  mintAuthority,
  name,
  symbol,
  decimals,
  uri,
  additionalMetadata
);

const explorerLink = getExplorerLink(
  "address",
  mintAddress.toBase58(),
  "devnet"
);

console.log(`🏦 Token mint created at: ${explorerLink}`);
