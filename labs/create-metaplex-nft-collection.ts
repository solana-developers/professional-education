// See https://developers.metaplex.com/token-metadata/collections
import {
  createNft,
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

const collectionMint = generateSigner(umi);
const transaction = await createNft(umi, {
  mint: collectionMint,
  name: "My Collection",
  // https://developers.metaplex.com/token-metadata/token-standard#the-non-fungible-standard
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-nft-collection-offchain-data.json",
  sellerFeeBasisPoints: percentAmount(0),
  isCollection: true,
});

const result = await transaction.sendAndConfirm(umi);

console.log(
  `🖼️ 🖼️ 🖼️ Made NFT collection! See ${getExplorerLink(
    "transaction",
    result.signature.toString(),
    "devnet"
  )}`
);
