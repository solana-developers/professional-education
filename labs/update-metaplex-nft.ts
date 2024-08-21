import "dotenv/config";
import {
  fetchDigitalAsset,
  fetchMetadataFromSeeds,
  mplTokenMetadata,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, publicKey } from "@metaplex-foundation/umi";
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

// Our NFT address we made earlier
// const mint = publicKey("YOUR_MINT_ADDRESS_HERE");
const mint = publicKey("4CpLPpxvZJJViUrUpnLj5gX1ZNRvCB7jdcrjLGb9Wixi");

// Update the NFT metadata
const initialMetadata = await fetchMetadataFromSeeds(umi, {
  mint,
});
await updateV1(umi, {
  mint,
  data: {
    ...initialMetadata,
    name: "Updated Asset",
    symbol: "Updated",
  },
}).sendAndConfirm(umi);

const createdNft = await fetchDigitalAsset(umi, mint);

console.log(
  `NFT updated with new metadata URI: ${getExplorerLink(
    "address",
    createdNft.mint.publicKey,
    "devnet"
  )}`
);

console.log("✅ Finished successfully!");
