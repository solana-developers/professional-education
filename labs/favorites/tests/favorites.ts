import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from "chai";
import {
  airdropIfRequired,
  getCustomErrorMessage,
  getKeypairFromEnvironment,
  getLogs,
} from "@solana-developers/helpers";
import { systemProgramErrors } from "./system-errors";
const log = console.log;
const web3 = anchor.web3;
import "dotenv/config";

describe("Favorites", () => {
  // Configure the client to use the cluster and the keypair from Anchor.toml
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const user = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Favorites as Program<Favorites>;

  it("Writes our favorites to the blockchain", async () => {
    await airdropIfRequired(
      anchor.getProvider().connection,
      user.publicKey,
      0.5 * web3.LAMPORTS_PER_SOL,
      1 * web3.LAMPORTS_PER_SOL
    );

    // Here's what we want to write to the blockchain
    const favoriteNumber = new anchor.BN(23);
    const favoriteColor = "purple";
    const favoriteHobbies = ["skiing", "skydiving", "biking"];

    // Generate the PDA for the user's favorites
    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesPda = favoritesPdaAndBump[0];

    log(`User is`, user.publicKey.toBase58());

    // Make a transaction to write to the blockchain
    await program.methods
      // Call the set_favorites instruction handler
      .setFavorites(favoriteNumber, favoriteColor, favoriteHobbies)
      .accounts({
        // Pass in the user's public key
        user: user.publicKey,
        // Pass in the PDA
        // TODO: Investigate why this is necessary
        // @ts-ignore
        favorites: favoritesPda,
        // Pass in the system program's public key
        systemProgram: web3.SystemProgram.programId,
      })
      // Sign the transaction
      .signers([user.payer])
      // Send the transaction to the cluster or RPC
      .rpc();

    const dataFromPda = await program.account.favorites.fetch(favoritesPda);
    // And make sure it matches!
    assert.equal(dataFromPda.color, favoriteColor);
    // A little extra work to make sure the BNs are equal
    assert.equal(dataFromPda.number.toString(), favoriteNumber.toString());
    // And check the hobbies too
    assert.deepEqual(dataFromPda.hobbies, favoriteHobbies);
  });
});
