// Adapted from https://github.com/Unboxed-Software/solana-metaplex/blob/solution/src/index.ts
// and updated to work with the latest version of the Metaplex SDK

import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  getKeypairFromFile,
  airdropIfRequired,
} from "@solana-developers/helpers";
import {
  Metaplex,
  keypairIdentity,
  irysStorage,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import { readFileSync } from "fs";

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

// metaplex set up
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(user))
  .use(
    irysStorage({
      address: "https://devnet.irys.xyz",
      providerUrl: "https://api.devnet.solana.com",
      timeout: 60000,
    })
  );

// Substitute in your collection NFT address from create-metaplex-nft-collection.ts
const collectionNftAddress = new PublicKey("YOUR_COLLECTION_NFT_ADDRESS_HERE");

// example data for a new NFT
const nftData = {
  name: "Name",
  symbol: "SYMBOL",
  description: "Description",
  sellerFeeBasisPoints: 0,
  imageFile: "solana.png",
};

// Load the file into Metaplex
const buffer = readFileSync(nftData.imageFile);
const file = toMetaplexFile(buffer, nftData.imageFile);

// upload image and get image uri
const imageUri = await metaplex.storage().upload(file);
console.log("image uri:", imageUri);

// upload metadata and get metadata uri (off chain metadata)
const uploadMetadataOutput = await metaplex.nfts().uploadMetadata({
  name: nftData.name,
  symbol: nftData.symbol,
  description: nftData.description,
  image: imageUri,
});

const metadataUri = uploadMetadataOutput.uri;

// create an NFT using the URI from the metadata
const createNftOutput = await metaplex.nfts().create(
  {
    uri: metadataUri, // metadata URI
    name: nftData.name,
    sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
    symbol: nftData.symbol,
    collection: collectionNftAddress,
  },
  { commitment: "finalized" }
);
const nft = createNftOutput.nft;

console.log(
  `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
);

await metaplex.nfts().verifyCollection({
  // Verify our collection as a Certified Collection
  // See https://developers.metaplex.com/token-metadata/collections
  mintAddress: nft.mint.address,
  collectionMintAddress: collectionNftAddress,
  isSizedCollection: true,
});

console.log(`Created NFT address is`, nft.address.toString());

console.log("✅ Finished successfully!");
