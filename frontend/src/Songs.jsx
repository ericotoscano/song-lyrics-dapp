import { Box, Button, Center, Flex, Heading, Highlight, TabPanel, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

const REGISTERV1_ADDRESS = '0x380abCe4Dfe7b35a365857c380f18A2119675dd9';

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
      { indexed: false, internalType: 'string', name: '_hash', type: 'string' },
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
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'isPaused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'string', name: '_songHash', type: 'string' }], name: 'register', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'withdraw', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];

function Songs({ account, signer, songSignature, isRegistered, registerReceipt, setIsRegistered, setRegisterReceipt }) {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const getSongs = async () => {
    try {
      setIsRegisterLoading(true);

      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);
      await SongRegister.connect(signer).register(songSignature, { gasLimit: 150000 });
      //const receipt = await register.wait();

      SongRegister.on('Registered', (sender, signature) => {
        const registeredByLine = [];

        registeredByLine.push('Successfully registered!');
        registeredByLine.push(`Song Writer: ${sender}`);
        registeredByLine.push(`Song Signature: ${signature}`);
        //registeredByLine.push(`Transaction Hash: ${receipt.transactionHash}`);

        setRegisterReceipt(registeredByLine);
      });
      setIsRegistered(true);
      setIsRegisterLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Center>
        <TabPanel>
          <Center>
            <Heading size="md" fontSize={30}>
              Register
            </Heading>
          </Center>

          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Box>
              <Text fontSize={20}>Now it's time to register your song!</Text>
            </Box>

            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  {isRegistered ? (
                    <Text fontSize="x-large" align="left" mt={10} mb={10}>
                      {registerReceipt.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </Text>
                  ) : (
                    <Box>
                      <Center>
                        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                          <Button isLoading={isRegisterLoading} loadingText="Registering Song..." fontSize={20} mt={20} mb={20} onClick={register}>
                            Register Your Song
                          </Button>
                        </Flex>
                      </Center>
                    </Box>
                  )}
                </Flex>
              </Center>
            </Box>
          </Flex>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Songs;
