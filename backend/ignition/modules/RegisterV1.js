const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
const { ethers } = require('hardhat');

module.exports = buildModule('RegisterV1', (m) => {
  const registerV1 = m.contract('SongRegister', [ethers.parseUnits('1.0', 'gwei')]);

  return { registerV1 };
});
