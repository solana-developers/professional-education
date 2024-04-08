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
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Favorites as Program<Favorites>;

  it("Writes our favorites to the blockchain", async () => {
    // Load our wallet
    const user = getKeypairFromEnvironment("SECRET_KEY");

    await airdropIfRequired(
      anchor.getProvider().connection,
      user.publicKey,
      0.5 * web3.LAMPORTS_PER_SOL,
      1 * web3.LAMPORTS_PER_SOL
    );

    // Here's what we want to write to the blockchain
    const favoriteNumber = new anchor.BN(23);
    const favoriteColor =
      "the color of the sky on a clear day when i am feeling happy and free and the wind is blowing the trees around";
    const favoriteHobbies = [
      "reading",
      "coding",
      "skiing",
      "skydiving",
      "biking",
      "hiking",
      "snakes and ladders",
      "doing cool stuff like racing up the stairs on a skateboard using only my hands and a helmet",
    ];

    // Generate the PDA for the user's favorites
    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesPda = favoritesPdaAndBump[0];

    // Make a transaction to write to the blockchain
    let tx: string | null = null;
    try {
      tx = await program.methods
        // Call the set_favorites instruction handler
        .setFavorites(favoriteNumber, favoriteColor, favoriteHobbies)
        .accounts({
          user: user.publicKey,
          favorites: favoritesPda,
        })
        // Sign the transaction
        .signers([user])
        // Send the transaction to the cluster or RPC
        .rpc();
    } catch (thrownObject) {
      // Let's properly log the error
      // so we can see the program involed
      // and (for well known programs) the full log message

      const rawError = thrownObject as Error;
      throw new Error(
        getCustomErrorMessage(systemProgramErrors, rawError.message)
      );
    }

    const dataFromPda = await program.account.favorites.fetch(favoritesPda);
    // And make sure it matches!
    assert.equal(dataFromPda.color, favoriteColor);
    // A little extra work to make sure the BNs are equal
    assert.equal(dataFromPda.number.toString(), favoriteNumber.toString());
    // And check the hobbies too
    assert.deepEqual(dataFromPda.hobbies, favoriteHobbies);
  });
});
