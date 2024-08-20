// Adapted from https://github.com/Unboxed-Software/solana-metaplex/blob/solution/src/index.ts
// and updated to work with the latest version of the Metaplex SDK

import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
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
import { readFile } from "fs/promises";

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

const collectionNftData = {
  name: "TestCollectionNFT",
  symbol: "TEST",
  description: "Test Description Collection",
  sellerFeeBasisPoints: 100,
  imageFile: "nft.png",
  isCollection: true,
  collectionAuthority: user,
};

// Load file into Metaplex
const buffer = await readFile(collectionNftData.imageFile);
const file = toMetaplexFile(buffer, collectionNftData.imageFile);

// upload image and get image uri
const imageUri = await metaplex.storage().upload(file);
console.log("image uri:", imageUri);

// upload metadata and get metadata uri (off chain metadata)
const uploadMetadataOutput = await metaplex.nfts().uploadMetadata({
  name: collectionNftData.name,
  symbol: collectionNftData.symbol,
  description: collectionNftData.description,
  image: imageUri,
});

const collectionUri = uploadMetadataOutput.uri;
console.log("Collection off-chain metadata URI:", collectionUri);

// create a collection NFT using the URI from the metadata
const createNftOutput = await metaplex.nfts().create(
  {
    uri: collectionUri,
    name: collectionNftData.name,
    sellerFeeBasisPoints: collectionNftData.sellerFeeBasisPoints,
    symbol: collectionNftData.symbol,
    isCollection: true,
  },
  { commitment: "finalized" }
);

const collectionNft = createNftOutput.nft;

console.log(
  `Collection NFT: https://explorer.solana.com/address/${collectionNft.address.toString()}?cluster=devnet`
);

console.log(`Collection NFT address is`, collectionNft.address.toString());

console.log("✅ Finished successfully!");
