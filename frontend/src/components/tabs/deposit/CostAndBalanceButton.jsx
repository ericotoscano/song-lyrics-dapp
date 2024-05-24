import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

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
function CostAndBalanceButton({
  account,
  currentCostInEther,
  currentCostInGwei,
  currentBalanceInGwei,
  currentBalanceInEther,
  isBalanceLoaded,
  signer,
  isChecked,
  depositReceipt,
  setIsChecked,
  setIsDeposited,
  setCurrentCostInEther,
  setCurrentCostInGwei,
  setCurrentBalanceInGwei,
  setCurrentBalanceInEther,
  setIsBalanceLoaded,
}) {
  const getCostAndBalance = async () => {
    try {
      setIsBalanceLoaded(true);

      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);

      const currentCost = await SongRegister.cost();
      const currentBalance = await SongRegister.balances(account);

      const costInGwei = ethers.utils.formatUnits(currentCost, 'gwei');
      const costInEther = ethers.utils.formatUnits(currentCost, 'ether');

      const balanceInGwei = ethers.utils.formatUnits(currentBalance, 'gwei');
      const balanceInEther = ethers.utils.formatUnits(currentBalance, 'ether');

      setCurrentCostInGwei(parseInt(costInGwei));
      setCurrentCostInEther(costInEther);

      setCurrentBalanceInGwei(parseInt(balanceInGwei));
      setCurrentBalanceInEther(balanceInEther);

      if (balanceInGwei >= costInGwei) {
        setIsDeposited(true);
      }

      setIsChecked(true);
      setIsBalanceLoaded(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box>
      {isChecked ? (
        depositReceipt.length == 0 ? (
          <Flex alignItems={'start'} flexDirection={'column'}>
            <Text as="em" fontSize="x-large" align="center" color="#f1c550">
              Current Cost: {currentCostInGwei} Gwei ({currentCostInEther} Ether)
            </Text>
            <Text as="em" fontSize="x-large" align="center" color="#f1c550">
              Your Balance: {currentBalanceInGwei} Gwei ({currentBalanceInEther} Ether)
            </Text>
          </Flex>
        ) : (
          <Flex alignItems={'center'} flexDirection={'column'}>
            <Center>
              <Text as="b" mb={20} fontSize={20} color="#f1c550">
                Successfully Deposited!
              </Text>
            </Center>

            <Flex alignItems={'start'} flexDirection={'column'}>
              {depositReceipt.map((line, index) => (
                <li key={index}>
                  <Text as="em" fontSize="x-large" align="center" color="#f1c550">
                    {line}
                  </Text>
                </li>
              ))}
            </Flex>
          </Flex>
        )
      ) : (
        <Flex alignItems={'center'} flexDirection={'column'}>
          <Text fontSize={20}>Let's check the current cost to register a song and your balance on the contract.</Text>
          <Button isLoading={isBalanceLoaded} loadingText="Checking Cost and Balance..." fontSize={20} mt={20} mb={20} onClick={getCostAndBalance}>
            Check Cost and Balance
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default CostAndBalanceButton;
