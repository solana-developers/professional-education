// See https://developers.metaplex.com/token-metadata
// and https://developers.metaplex.com/token-metadata/collections#associating-nfts-to-collection-nfts
import {
  mplTokenMetadata,
  verifyCollectionV1,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  airdropIfRequired,
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  keypairIdentity,
  publicKey,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

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

const collectionAddress = new PublicKey(
  "GyddqwoWKffNjgLZZwENHvjaegQqdy3wmiEuumGeiEvn"
);

const nftAddress = new PublicKey(
  "AHKg2uDKR1dwz7R2bAGjZc8wDn8PkCGH4SD5VH7WU45o"
);

// Make a metaplex signer from the 'user' keypair.
const signer = createSignerFromKeypair(umi, umiKeypair);

// See https://developers.metaplex.com/token-metadata/collections
await verifyCollectionV1(umi, {
  // The NFT we want to verify inside the collection.
  metadata: publicKey(nftAddress),
  // The Collection NFT that is already set on the Metadata account of the NFT but not yet verified.
  collectionMint: publicKey(collectionAddress),
  // The Update Authority of the Collection NFT as a signer
  authority: signer,
}).sendAndConfirm(umi);
