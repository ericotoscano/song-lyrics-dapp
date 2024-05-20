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
function Deposit({ account, signer, isChecked, isDeposited, depositReceipt, setIsChecked, setIsDeposited, setDepositReceipt }) {
  const [currentCostInEther, setCurrentCostInEther] = useState(0);
  const [currentCostInGwei, setCurrentCostInGwei] = useState(0);
  const [currentBalanceInGwei, setCurrentBalanceInGwei] = useState(0);
  const [currentBalanceInEther, setCurrentBalanceInEther] = useState(0);
  const [isDepositLoaded, setIsDepositLoaded] = useState(false);
  const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);

  const deposit = async () => {
    try {
      setIsDepositLoaded(true);

      const cost = currentCostInGwei;

      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);
      await SongRegister.connect(signer).deposit({ value: 1000000000, gasLimit: 50000 });

      SongRegister.on('Deposited', (sender, value, balance) => {
        const depositedByLine = [];

        depositedByLine.push('Successfully deposited!');
        depositedByLine.push(`Sender: ${sender}`);
        depositedByLine.push(`Value: ${parseInt(ethers.utils.formatUnits(value, 'gwei'))} Gwei`);
        depositedByLine.push(`Your New Balance: ${parseInt(ethers.utils.formatUnits(balance, 'gwei'))} Gwei`);
        depositedByLine.push(`Current Cost: ${cost} Gwei`);

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

  const getBalance = async () => {
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
      <Center>
        <TabPanel>
          <Center>
            <Heading size="md" fontSize={30}>
              Deposit
            </Heading>
          </Center>

          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Box>
              <Text fontSize={20}>To register your song, you must have a sufficient balance deposited in contract.</Text>
              {isChecked ? null : <Text fontSize={20}>You can check this clicking on the button bellow.</Text>}
            </Box>

            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  {isChecked ? (
                    depositReceipt.length == 0 ? (
                      <Box>
                        <Center>
                          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                            <Text mt={10} fontSize="x-large" align="center">
                              Your Balance: {currentBalanceInGwei} Gwei ({currentBalanceInEther} Ether)
                            </Text>

                            <Text mt={0} fontSize="x-large" align="center">
                              Current Cost: {currentCostInGwei} Gwei ({currentCostInEther} Ether)
                            </Text>
                          </Flex>
                        </Center>
                      </Box>
                    ) : (
                      <Text fontSize="x-large" align="left" mt={10} mb={10}>
                        {depositReceipt.map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </Text>
                    )
                  ) : (
                    <Box>
                      <Center>
                        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                          <Button isLoading={isBalanceLoaded} loadingText="Checking Balance..." fontSize={20} mt={20} mb={20} onClick={getBalance}>
                            Check Your Balance
                          </Button>
                        </Flex>
                      </Center>
                    </Box>
                  )}
                </Flex>
              </Center>
            </Box>

            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  {isChecked ? (
                    isDeposited ? (
                      <Box>
                        <Center>
                          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                            <Text as="b" mt={20} fontSize={20}>
                              Your have a sufficient balance!
                            </Text>

                            <Text as="b" m={20} fontSize={20}>
                              <Highlight query="Register" styles={{ px: '0.5em', py: '0.5em', borderRadius: '10', bg: 'rgba(43, 211, 160, 0.87)', color: 'white' }}>
                                Click on Register Tab to continue...
                              </Highlight>
                            </Text>
                          </Flex>
                        </Center>
                      </Box>
                    ) : (
                      <Box>
                        <Center>
                          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                            <Box mb={20}>
                              <Text fontSize={20}>Your don't have enough balance but you can make a deposit.</Text>
                              <Text fontSize={20}>Click on the button bellow to make a deposit in the amount of the cost!</Text>
                            </Box>

                            <Box mb={20}>
                              <Button isLoading={isDepositLoaded} loadingText="Depositing..." fontSize={20} mb={20} onClick={deposit}>
                                Deposit
                              </Button>
                            </Box>
                          </Flex>
                        </Center>
                      </Box>
                    )
                  ) : null}
                </Flex>
              </Center>
            </Box>
          </Flex>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Deposit;
