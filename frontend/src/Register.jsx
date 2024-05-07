import { Button, TabPanel, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

const REGISTERV1_ADDRESS = '0x28439FBaC49ee85D692f32c28004407C8B698CCa';

const REGISTERV1_ABI = [
  { inputs: [{ internalType: 'uint256', name: '_cost', type: 'uint256' }], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'NoBalance', type: 'error' },
  { inputs: [], name: 'NoFunds', type: 'error' },
  { inputs: [], name: 'NotOwner', type: 'error' },
  { inputs: [], name: 'Paused', type: 'error' },
  { inputs: [], name: 'Unpaused', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: '_account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: '_deposit', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: '_balance', type: 'uint256' },
    ],
    name: 'Deposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: '_writer', type: 'address' },
      { indexed: false, internalType: 'bytes32', name: '_hash', type: 'bytes32' },
      { indexed: false, internalType: 'uint256', name: '_timestamp', type: 'uint256' },
    ],
    name: 'Registered',
    type: 'event',
  },
  { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balances', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'cost', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'deposit', outputs: [], stateMutability: 'payable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: '_songwriter', type: 'address' }],
    name: 'getSongs',
    outputs: [{ internalType: 'bytes32[]', name: '', type: 'bytes32[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'isPaused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'bytes32', name: '_songHash', type: 'bytes32' }], name: 'register', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'withdraw', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];

function Register({ signer, songSignature }) {
  const deposit = async () => {
    try {
      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);
      await SongRegister.connect(signer).deposit({ value: 1000000000, gasLimit: 50000 });
    } catch (error) {
      console.log(error.message);
    }
  };
  const registerSong = async () => {
    try {
      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);
      await SongRegister.connect(signer).register(ethers.utils.formatBytes32String(songSignature));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <TabPanel>
      <Text mb={0} fontSize={20}>
        Now your song is encrypted and its signature is {songSignature}. Click on the button bellow to register it on blockchain.
      </Text>
      <Button mb={10} mt={20} onClick={deposit}>
        Register your song
      </Button>
    </TabPanel>
  );
}

export default Register;
