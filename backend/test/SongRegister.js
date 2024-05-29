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

  async function depositFixture() {
    const { songRegister, songwriter } = await loadFixture(deployFixture);

    const balanceBeforeDeposit = await songRegister.balances(songwriter.address);

    await songRegister.connect(songwriter).deposit({ value: COST });

    const balanceAfterDeposit = await songRegister.balances(songwriter.address);

    return { balanceBeforeDeposit, balanceAfterDeposit };
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

  describe('Deposits', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if pause switch is turned on', async function () {
        const { songRegister, owner, songwriter } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        await expect(songRegister.connect(songwriter).deposit({ value: COST })).to.be.revertedWithCustomError(songRegister, 'Paused');
      });

      it('Should revert with a custom error if funds sent are not enough', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).deposit({ value: COST / 2 })).to.be.revertedWithCustomError(songRegister, 'NoFunds');
      });
    });

    describe('Actions', function () {
      it('Should deposit some ether value in contract', async function () {
        const { songRegister } = await loadFixture(deployFixture);
        await loadFixture(depositFixture);

        expect(await ethers.provider.getBalance(songRegister.getAddress())).to.equal(BigInt(COST));
      });

      it("Should increase sender's balance with the value deposited", async function () {
        const { balanceAfterDeposit, balanceBeforeDeposit } = await loadFixture(depositFixture);

        expect(balanceAfterDeposit).to.equal(balanceBeforeDeposit + BigInt(COST));
      });
    });

    describe('Events', function () {
      it('Should emit an event on deposits', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(await songRegister.connect(songwriter).deposit({ value: COST }))
          .to.emit(songRegister, 'Deposited')
          .withArgs(songwriter.address, COST, await songRegister.balances(songwriter.address));
      });
    });
  });

  describe('Registries', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if pause switch is turned on', async function () {
        const { songRegister, owner, songwriter } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        await expect(songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE)).to.be.revertedWithCustomError(songRegister, 'Paused');
      });

      it("Should revert with a custom error if sender's balance are not enough", async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE)).to.be.revertedWithCustomError(songRegister, 'NoBalance');
      });
    });

    describe('Actions', function () {
      it("Should decrease sender's balance by the registration cost", async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);
        const { balanceAfterDeposit } = await loadFixture(depositFixture);

        await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE);

        const balanceAfterRegister = await songRegister.balances(songwriter.address);

        expect(balanceAfterRegister).to.equal(balanceAfterDeposit - BigInt(COST));
      });

      it('Should register the song title and signature to songs mapping', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);
        await loadFixture(depositFixture);

        await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE);

        const songs = await songRegister.connect(songwriter).getSongs();

        expect(songs[0]).to.deep.equal([SONG1_TITLE, SONG1_SIGNATURE]);
      });
    });

    describe('Events', function () {
      it('Should emit an event on registers', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);
        await loadFixture(depositFixture);

        await expect(await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE))
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
        await loadFixture(depositFixture);

        await songRegister.connect(owner).withdraw();

        expect(await ethers.provider.getBalance(songRegister.getAddress())).to.equal(BigInt(0));
      });

      it("Should transfer all contract's ether balance to the owner", async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);
        await loadFixture(depositFixture);

        const contractBalance = await ethers.provider.getBalance(songRegister.getAddress());

        await expect(await songRegister.connect(owner).withdraw()).to.changeEtherBalance(owner, contractBalance);
      });
    });
  });

  describe('Pause', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if sender is not the owner', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).pause()).to.be.revertedWithCustomError(songRegister, 'NotOwner');
      });

      it('Should revert with a custom error if pause switch is turned on', async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        await expect(songRegister.connect(owner).pause()).to.be.revertedWithCustomError(songRegister, 'Paused');
      });
    });

    describe('Actions', function () {
      it('Should turn on the pause switch', async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        expect(await songRegister.isPaused()).to.equal(true);
      });
    });
  });

  describe('Unpause', function () {
    describe('Validations', function () {
      it('Should revert with a custom error if sender is not the owner', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        await expect(songRegister.connect(songwriter).unpause()).to.be.revertedWithCustomError(songRegister, 'NotOwner');
      });

      it('Should revert with a custom error if pause switch is turned off', async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        await expect(songRegister.connect(owner).unpause()).to.be.revertedWithCustomError(songRegister, 'Unpaused');
      });
    });

    describe('Actions', function () {
      it('Should turn off the pause switch', async function () {
        const { songRegister, owner } = await loadFixture(deployFixture);

        await songRegister.connect(owner).pause();

        await songRegister.connect(owner).unpause();

        expect(await songRegister.isPaused()).to.equal(false);
      });
    });
  });

  describe('Songs', function () {
    describe('Actions', function () {
      it('Should return an array filled by another arrays containing title and signature of each song registered by one songwriter', async function () {
        const { songRegister, songwriter } = await loadFixture(deployFixture);

        for (let i = 0; i < 3; i++) {
          await songRegister.connect(songwriter).deposit({ value: COST });
        }

        await songRegister.connect(songwriter).register(SONG1_TITLE, SONG1_SIGNATURE);
        await songRegister.connect(songwriter).register(SONG2_TITLE, SONG2_SIGNATURE);
        await songRegister.connect(songwriter).register(SONG3_TITLE, SONG3_SIGNATURE);

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
