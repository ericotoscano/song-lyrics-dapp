const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
const { ethers } = require('hardhat');

module.exports = buildModule('Register', (m) => {
  const songRegister = m.contract('SongRegister', [ethers.parseUnits('1.0', 'gwei')]);

  return { songRegister };
});
