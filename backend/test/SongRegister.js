const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers.js');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SongRegister', function () {
  const COST = 1000000000;
  const SONG1_TITLE = 'Song1';
  const SONG2_TITLE = 'Song2';
  const SONG3_TITLE = 'Song3';
  const SONG1_SIGNATURE = '0xf7c9e344b2af4319099bad529bbb79c8e90cef09e7be45ba733e464e3b6a9352';
  const SONG2_SIGNATURE = '0xe7c9e344b2af4319099bad529bbb79c8e90cef09e7be45ba733e464e3b6a9351';
  const SONG3_SIGNATURE = '0xd7c9e344b2af4319099bad529bbb79c8e90cef09e7be45ba733e464e3b6a9350';

  async function deployFixture() {
    const [owner, songwriter] = await ethers.getSigners();

    const SongRegister = await ethers.getContractFactory('SongRegister');
    const songRegister = await SongRegister.deploy(COST);

    return { songRegister, owner, songwriter };
  }

  describe('Deployment', function () {
    describe('Actions', function () {
      it('Should set the correct owner', async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        expect(await songRegister.owner()).to.equal(owner.address);
      });

      it('Should set pause switch to off', async function () {
        const { songRegister } = await loadFixture(deployFixture);

        expect(await songRegister.isPaused()).to.equal(false);
      });

      it('Should set the correct cost', async function () {
        const { songRegister } = await loadFixture(deployFixture);

        expect(await songRegister.cost()).to.equal(COST);
      });
    });
  });

  describe('Registries', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if pause switch is turned on', async function () {
        const { songRegister, owner, songwriter } = await loadFixture(deployFixture);

        await songRegister.connect(owner).switchIsPaused();

        await expect(songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE)).to.be.revertedWithCustomError(songRegister, 'Paused');
      });

      it('Should revert with a custom error if value sent is not enough', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE, { value: 0 })).to.be.revertedWithCustomError(songRegister, 'NoFunds');
      });
    });

    describe('Actions', function () {
      it("Should decrease sender's balance by the registration cost", async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE, { value: COST })).to.changeEtherBalance(songwriter, BigInt(-COST));
      });

      it("Should increase contract's balance by the registration cost", async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE, { value: COST })).to.changeEtherBalance(songRegister, BigInt(COST));
      });

      it('Should register the song title and signature to songs mapping', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE, { value: COST });

        const songs = await songRegister.connect(songwriter).getSongs();

        expect(songs[0]).to.deep.equal([SONG1_TITLE, SONG1_SIGNATURE]);
      });
    });

    describe('Events', function () {
      it('Should emit an event on registers', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE, { value: COST }))
          .to.emit(songRegister, 'Registered')
          .withArgs(songwriter.address, SONG1_TITLE, SONG1_SIGNATURE);
      });
    });
  });

  describe('Withdrawals', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if sender is not the owner', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).withdraw()).to.be.revertedWithCustomError(songRegister, 'NotOwner');
      });
    });

    describe('Actions', function () {
      it("Should take to zero the contract's ether balance", async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        await songRegister.connect(owner).withdraw();

        expect(await ethers.provider.getBalance(songRegister.getAddress())).to.equal(BigInt(0));
      });

      it("Should transfer all contract's ether balance to the owner", async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        const contractBalance = await ethers.provider.getBalance(songRegister.getAddress());

        await expect(await songRegister.connect(owner).withdraw()).to.changeEtherBalance(owner, contractBalance);
      });
    });
  });

  describe('Pause', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if sender is not the owner', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).switchIsPaused()).to.be.revertedWithCustomError(songRegister, 'NotOwner');
      });
    });

    describe('Actions', function () {
      it('Should switch contract pause status', async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        const isPaused = await songRegister.isPaused();

        await songRegister.connect(owner).switchIsPaused();

        expect(await songRegister.isPaused()).to.equal(!isPaused);
      });
    });
  });

  describe('Songs', function () {
    describe('Actions', function () {
      it('Should return an array filled by another arrays containing title and signature of each song registered by one songwriter', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE, { value: COST });
        await songRegister.connect(songwriter).register(SONG2_TITLE, SONG2_SIGNATURE, { value: COST });
        await songRegister.connect(songwriter).register(SONG3_TITLE, SONG3_SIGNATURE, { value: COST });

        const songs = await songRegister.connect(songwriter).getSongs();

        expect(songs).to.deep.equal([
          [SONG1_TITLE, SONG1_SIGNATURE],
          [SONG2_TITLE, SONG2_SIGNATURE],
          [SONG3_TITLE, SONG3_SIGNATURE],
        ]);
      });
    });
  });
});
