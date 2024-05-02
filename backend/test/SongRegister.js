const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers.js');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SongRegister', function () {
  async function deployFixture() {
    const COST = 1000000000;
    const SONG_HASH = '0xf7c9e344b2af4319099bad529bbb79c8e90cef09e7be45ba733e464e3b6a9352';

    const validDepositValue = COST;
    const invalidDepositValue = 0.5 * COST;

    const validSongHash = SONG_HASH;
    const invalidSongHash = SONG_HASH.slice(2);

    const [owner, songwriter] = await ethers.getSigners();

    const SongRegister = await ethers.getContractFactory('SongRegister');
    const songRegister = await SongRegister.deploy(COST);

    return { songRegister, owner, songwriter, validDepositValue, invalidDepositValue, validSongHash, invalidSongHash };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { songRegister, owner } = await loadFixture(deployFixture);

      expect(await songRegister.owner()).to.equal(owner.address);
    });

    it('Should set pause switch to off', async function () {
      const { songRegister } = await loadFixture(deployFixture);

      expect(await songRegister.isPaused()).to.equal(false);
    });

    it('Should set the right cost', async function () {
      const { songRegister, validDepositValue } = await loadFixture(deployFixture);

      expect(await songRegister.cost()).to.equal(validDepositValue);
    });
  });

  describe('Deposits', function () {
    describe('Validations', function () {
      it('Should revert with the right error if pause switch is turned on', async function () {
        const { songRegister, owner, songwriter, validDepositValue } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        expect(songRegister.connect(songwriter).deposit({ value: validDepositValue })).to.be.revertedWithCustomError(songRegister, 'Paused');
      });

      it('Should revert with the right error if funds sent are not enough', async function () {
        const { songRegister, songwriter, invalidDepositValue } = await loadFixture(deployFixture);

        expect(songRegister.connect(songwriter).deposit({ value: invalidDepositValue })).to.be.revertedWithCustomError(songRegister, 'NoFunds');
      });
    });

    describe('Actions', function () {
      it("Should increase sender's balance with the value deposited", async function () {
        const { songRegister, songwriter, validDepositValue } = await loadFixture(deployFixture);

        const balanceBefore = await songRegister.balances(songwriter.address);

        await songRegister.connect(songwriter).deposit({ value: validDepositValue });

        const balanceAfter = await songRegister.balances(songwriter.address);

        const difference = balanceAfter - balanceBefore;

        expect(difference).to.equal(BigInt(validDepositValue));
      });
    });

    describe('Events', function () {
      it('Should emit an event on deposits', async function () {
        const { songRegister, songwriter, validDepositValue } = await loadFixture(deployFixture);

        expect(await songRegister.connect(songwriter).deposit({ value: validDepositValue }))
          .to.emit(songRegister, 'Deposited')
          .withArgs(songwriter.address, validDepositValue, await songRegister.balances(songwriter.address));
      });
    });
  });

  describe('Registries', function () {
    describe('Validations', function () {
      it('Should revert with the right error if pause switch is turned on', async function () {
        const { songRegister, owner, songwriter, validSongHash } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        expect(songRegister.connect(songwriter).register(validSongHash)).to.be.revertedWithCustomError(songRegister, 'Paused');
      });

      it("Should revert with the right error if sender's balance are not enough", async function () {
        const { songRegister, songwriter, validSongHash } = await loadFixture(deployFixture);

        expect(songRegister.connect(songwriter).register(validSongHash)).to.be.revertedWithCustomError(songRegister, 'NoBalance');
      });
    });

    describe('Actions', function () {
      it("Should decrease sender's balance by the registration cost", async function () {
        const { songRegister, songwriter, validDepositValue, validSongHash } = await loadFixture(deployFixture);

        await songRegister.connect(songwriter).deposit({ value: validDepositValue });

        const balanceBefore = await songRegister.balances(songwriter.address);

        await songRegister.connect(songwriter).register(validSongHash);

        const balanceAfter = await songRegister.balances(songwriter.address);

        const difference = balanceBefore - balanceAfter;

        expect(difference).to.equal(BigInt(validDepositValue));
      });

      it('Should register the song hash to songs mapping', async function () {
        const { songRegister, songwriter, validDepositValue, validSongHash } = await loadFixture(deployFixture);

        await songRegister.connect(songwriter).deposit({ value: validDepositValue });

        await songRegister.connect(songwriter).register(validSongHash);

        const songs = await songRegister.getSongs(songwriter.address);

        expect(songs[0]).to.equal(validSongHash);
      });
    });

    describe('Events', function () {
      it('Should emit an event on registers', async function () {
        const { songRegister, songwriter, validSongHash, validDepositValue } = await loadFixture(deployFixture);

        const deposit = await songRegister.connect(songwriter).deposit({ value: validDepositValue });

        const timestamp = deposit.timestamp;

        expect(await songRegister.connect(songwriter).register(validSongHash))
          .to.emit(songRegister, 'Registered')
          .withArgs(songwriter.address, validDepositValue, timestamp);
      });
    });
  });
});
