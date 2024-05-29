const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
const { ethers } = require('hardhat');

module.exports = buildModule('Register', (m) => {
  const registerV1 = m.contract('SongRegister', [ethers.parseUnits('1.0', 'gwei')]);

  return { registerV1 };
});
