import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAccount } from '../../../utils/formatter';

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
function Result({ signer, isChecked, isDeposited, currentCostInGwei, setCurrentBalanceInGwei, isDepositLoaded, setIsDepositLoaded, setIsDeposited, setDepositReceipt }) {
  const deposit = async () => {
    try {
      setIsDepositLoaded(true);

      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);
      const currentCost = await SongRegister.cost();
      await SongRegister.connect(signer).deposit({ value: 1000000000, gasLimit: 50000 });

      SongRegister.on('Deposited', (sender, value, balance) => {
        const depositedByLine = [];

        depositedByLine.push(`Sender: ${formatAccount(sender)}`);

        depositedByLine.push(`Deposit Value: ${parseInt(ethers.utils.formatUnits(value, 'gwei'))} Gwei (${ethers.utils.formatUnits(value, 'ether')} Ether) `);

        depositedByLine.push(`Current Balance: ${parseInt(ethers.utils.formatUnits(balance, 'gwei'))} Gwei (${ethers.utils.formatUnits(balance, 'ether')} Ether)`);

        depositedByLine.push(`Current Cost: ${parseInt(ethers.utils.formatUnits(currentCost, 'gwei'))} Gwei (${ethers.utils.formatUnits(currentCost, 'ether')} Ether)`);

        setCurrentBalanceInGwei(parseInt(ethers.utils.formatUnits(balance, 'gwei')));

        if (parseInt(ethers.utils.formatUnits(balance, 'gwei')) >= currentCostInGwei) {
          setIsDeposited(true);
        }

        setDepositReceipt(depositedByLine);
        setIsDepositLoaded(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box mb={40}>
      {isChecked ? (
        isDeposited ? (
          <Center>
            <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
              <Text as="b" mt={20} fontSize={20}>
                You have a sufficient balance!
              </Text>
              <Text as="b" mt={40} fontSize={20}>
                <Highlight query="Register" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
                  Click on Register to continue...
                </Highlight>
              </Text>
            </Flex>
          </Center>
        ) : (
          <Center>
            <Flex alignItems={'center'} flexDirection={'column'}>
              <Center>
                <Text as="b" mt={20} fontSize={20} color={'tomato'}>
                  You don't have enough balance!
                </Text>
              </Center>

              <Text mt={20} mb={20} fontSize={20}>
                But you can make a deposit for the cost by clicking the button below...
              </Text>
              <Center>
                <Button isLoading={isDepositLoaded} loadingText="Depositing..." fontSize={20} mt={20} onClick={deposit}>
                  Deposit
                </Button>
              </Center>
            </Flex>
          </Center>
        )
      ) : null}
    </Box>
  );
}

export default Result;
