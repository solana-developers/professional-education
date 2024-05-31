import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { Escrow } from "../target/types/escrow";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { assert } from "chai";
import { randomBytes } from "crypto";
import {
  confirmTransaction,
  getExplorerLink,
  makeKeypairs,
} from "@solana-developers/helpers";
const log = console.log;
const stringify = (object: any) => JSON.stringify(object, null, 2);

const TOKEN_PROGRAM: typeof TOKEN_2022_PROGRAM_ID | typeof TOKEN_PROGRAM_ID =
  TOKEN_2022_PROGRAM_ID;

const getRandomNumber = () => {
  return new BN(randomBytes(8));
};

describe("anchor-escrow", async () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.getProvider();

  const connection = provider.connection;

  const program = anchor.workspace.Escrow as Program<Escrow>;

  // We're going to reuse these accounts across multiple tests
  const accounts: Record<string, PublicKey> = {
    tokenProgram: TOKEN_PROGRAM,
  };

  const [alice, bob, tokenMintA, tokenMintB] = makeKeypairs(4);

  before(
    "Creates Alice and Bob accounts, 2 token mints, and associated token accounts for both tokens for both users",
    async () => {
      const [
        aliceTokenAccountA,
        aliceTokenAccountB,
        bobTokenAccountA,
        bobTokenAccountB,
      ] = [alice, bob]
        .map((keypair) =>
          [tokenMintA, tokenMintB].map((mint) =>
            getAssociatedTokenAddressSync(
              mint.publicKey,
              keypair.publicKey,
              false,
              TOKEN_PROGRAM
            )
          )
        )
        .flat();

      // Airdrops to users, and creates two tokens mints 'A' and 'B'"
      let minimumLamports = await getMinimumBalanceForRentExemptMint(
        connection
      );

      const sendSolInstructions: Array<TransactionInstruction> = [
        alice,
        bob,
      ].map((account) =>
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: account.publicKey,
          lamports: 10 * LAMPORTS_PER_SOL,
        })
      );

      const createMintInstructions: Array<TransactionInstruction> = [
        tokenMintA,
        tokenMintB,
      ].map((mint) =>
        SystemProgram.createAccount({
          fromPubkey: provider.publicKey,
          newAccountPubkey: mint.publicKey,
          lamports: minimumLamports,
          space: MINT_SIZE,
          programId: TOKEN_PROGRAM,
        })
      );

      // Make tokenA and tokenB mints, mint tokens and create ATAs
      const mintTokensInstructions: Array<TransactionInstruction> = [
        {
          mint: tokenMintA.publicKey,
          authority: alice.publicKey,
          ata: aliceTokenAccountA,
        },
        {
          mint: tokenMintB.publicKey,
          authority: bob.publicKey,
          ata: bobTokenAccountB,
        },
      ].flatMap((mintDetails) => [
        createInitializeMint2Instruction(
          mintDetails.mint,
          6,
          mintDetails.authority,
          null,
          TOKEN_PROGRAM
        ),
        createAssociatedTokenAccountIdempotentInstruction(
          provider.publicKey,
          mintDetails.ata,
          mintDetails.authority,
          mintDetails.mint,
          TOKEN_PROGRAM
        ),
        createMintToInstruction(
          mintDetails.mint,
          mintDetails.ata,
          mintDetails.authority,
          1_000_000_000,
          [],
          TOKEN_PROGRAM
        ),
      ]);

      // Add all these instructions to our transaction
      let tx = new Transaction();
      tx.instructions = [
        ...sendSolInstructions,
        ...createMintInstructions,
        ...mintTokensInstructions,
      ];

      const transactionSignature = await provider.sendAndConfirm(tx, [
        tokenMintA,
        tokenMintB,
        alice,
        bob,
      ]);

      // Save the accounts for later use
      accounts.maker = alice.publicKey;
      accounts.taker = bob.publicKey;
      accounts.offeredTokenMint = tokenMintA.publicKey;
      accounts.makerOfferedTokenAccount = aliceTokenAccountA;
      accounts.takerOfferedTokenAccount = bobTokenAccountA;
      accounts.wantedTokenMint = tokenMintB.publicKey;
      accounts.makerWantedTokenAccount = aliceTokenAccountB;
      accounts.takerWantedTokenAccount = bobTokenAccountB;
    }
  );

  // We'll call this function from multiple tests, so let's seperate it out
  const make = async () => {
    // Pick a random ID for the offer we'll make
    const offerId = getRandomNumber();
    const offeredAmount = new BN(1_000_000);
    const wantedAmount = new BN(1_000_000);

    // Then determine the account addresses we'll use for the offer and the vault
    const offer = PublicKey.findProgramAddressSync(
      [
        Buffer.from("offer"),
        accounts.maker.toBuffer(),
        offerId.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    )[0];

    const vault = getAssociatedTokenAddressSync(
      accounts.offeredTokenMint,
      offer,
      true,
      TOKEN_PROGRAM
    );

    accounts.offer = offer;
    accounts.vault = vault;

    const transactionSignature = await program.methods
      .makeOffer(offerId, offeredAmount, wantedAmount)
      .accounts({ ...accounts })
      .signers([alice])
      .rpc();

    await confirmTransaction(connection, transactionSignature);

    // Check our vault contains the tokens offered
    const vaultBalanceResponse = await connection.getTokenAccountBalance(vault);
    const vaultBalance = vaultBalanceResponse.value.amount;
    assert.equal(vaultBalance, offeredAmount.toString());

    // Check our Offer account contains the correct data
    const offerAccount = await program.account.offer.fetch(offer);

    assert.equal(offerAccount.maker.toBase58(), alice.publicKey.toBase58());
    assert.equal(
      offerAccount.offeredTokenMint.toBase58(),
      accounts.offeredTokenMint.toBase58()
    );
    assert.equal(offerAccount.wantedAmount.toString(), wantedAmount.toString());
    assert.equal(
      offerAccount.wantedTokenMint.toBase58(),
      accounts.wantedTokenMint.toBase58()
    );

    const explorerLink = getExplorerLink(
      "transaction",
      transactionSignature,
      "localnet"
    );
    console.log(`Make offer transaction: ${explorerLink}`);
  };

  // We'll call this function from multiple tests, so let's seperate it out
  const take = async () => {
    const transactionSignature = await program.methods
      .takeOffer()
      .accounts({ ...accounts })
      .signers([bob])
      .rpc();

    await confirmTransaction(connection, transactionSignature);
    const explorerLink = getExplorerLink(
      "transaction",
      transactionSignature,
      "localnet"
    );
    console.log(`Take offer transaction: ${explorerLink}`);
  };

  it("Makes an offer as Alice", async () => {
    await make();
  });

  it("Takes Alice's offer as Bob", async () => {
    await take();
  });
});
