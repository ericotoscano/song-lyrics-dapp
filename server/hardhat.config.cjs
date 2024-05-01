require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ignition-ethers');

/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();

module.exports = {
  solidity: '0.8.24',
  networks: {
    polygonAmoy: {
      url: process.env.RPC_NODE,
      chainId: Number(process.env.CHAIN_ID),
      accounts: [process.env.SECRET],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.API_KEY
    },
    customChains: [
      {
        network: 'polygonAmoy',
        chainId: Number(process.env.CHAIN_ID),
        urls: {
          apiURL: process.env.API_URL,
          browserURL: process.env.BROWSER_URL,
        },
      },
    ],
  },
};
