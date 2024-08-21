// See https://developers.metaplex.com/token-metadata
import {
  createNft,
  fetchDigitalAsset,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  generateSigner,
  keypairIdentity,
  percentAmount,
} from "@metaplex-foundation/umi";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

// create a new connection to the cluster's API
const connection = new Connection(clusterApiUrl("devnet"));

// initialize a keypair for the user
const user = await getKeypairFromFile();

await airdropIfRequired(
  connection,
  user.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.1 * LAMPORTS_PER_SOL
);

console.log("Loaded user:", user.publicKey.toBase58());

// Create Umi Instance, using the same endpoint as our connection,
// and using our user to sign transactions
const umi = createUmi(connection.rpcEndpoint).use(mplTokenMetadata());
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
umi.use(keypairIdentity(umiKeypair));

// Generate an NFT
console.log(`Creating NFT...`);
const mint = generateSigner(umi);
await createNft(umi, {
  mint,
  name: "My NFT",
  // https://developers.metaplex.com/token-metadata/token-standard#the-non-fungible-standard
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-nft-offchain-data.json",
  sellerFeeBasisPoints: percentAmount(0),
}).sendAndConfirm(umi);

const createdNft = await fetchDigitalAsset(umi, mint.publicKey);

console.log(
  `Created NFT address is: ${getExplorerLink(
    "address",
    createdNft.mint.publicKey,
    "devnet"
  )}`
);

console.log("✅ Finished successfully!");
