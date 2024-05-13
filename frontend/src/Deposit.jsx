import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Center, Flex, Heading, TabPanel, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

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

function Deposit({ account, signer, isDeposited, setIsDeposited }) {
  const [currentCostInEther, setCurrentCostInEther] = useState(0);
  const [currentCostInGwei, setCurrentCostInGwei] = useState(0);
  const [currentBalanceInGwei, setCurrentBalanceInGwei] = useState(0);
  const [currentBalanceInEther, setCurrentBalanceInEther] = useState(0);
  const [depositReceipt, setDepositReceipt] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const deposit = async () => {
    try {
      const SongRegister = new ethers.Contract(REGISTERV1_ADDRESS, REGISTERV1_ABI, signer);

      await SongRegister.connect(signer).deposit({ value: 1000000000, gasLimit: 50000 });

      SongRegister.on('Deposited', (sender, value, balance) => {
        const depositedByLine = [];

        depositedByLine.push('Successfully deposited!');
        depositedByLine.push(`Sender: ${sender}`);
        depositedByLine.push(`Value: ${parseInt(ethers.utils.formatUnits(value, 'gwei'))} Gwei`);
        depositedByLine.push(`New Balance: ${parseInt(ethers.utils.formatUnits(balance, 'gwei'))} Gwei`);

        setDepositReceipt(depositedByLine);
      });

    } catch (error) {
      console.log(error.message);
    }
  };

  const getBalance = async () => {
    try {
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

      if (balanceInGwei >= 4* costInGwei) {
        setIsDeposited(true);
      }

      setIsChecked(true);
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
            <Box mb={40}>
              <Text mb={0} fontSize={20}>
                To register your song, you must have a sufficient balance in your wallet.
              </Text>
              <Text mb={0} fontSize={20}>
                You can check this clicking on the button bellow.
              </Text>
            </Box>
            <Box>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton onClick={getBalance}>
                    <Box as="span" flex="1" textAlign="center">
                      Cost and Balance
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text pt={4} fontSize="x-large" align="center">
                      Current Cost: {currentCostInGwei} Gwei ({currentCostInEther} Ether)
                    </Text>
                    <Text pt={4} fontSize="x-large" align="center">
                      Your balance: {currentBalanceInGwei} Gwei ({currentBalanceInEther} Ether)
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
            {isChecked ? (
              isDeposited ? (
                <Text mb={0} fontSize={20}>
                  You have enough balance in your wallet, go on and register your song!
                </Text>
              ) : (
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  <Box mb={40}>
                    <Text mb={0} fontSize={20}>
                      Your don't have enough balance in your wallet but you can make a deposit.
                    </Text>
                    <Text mb={0} fontSize={20}>
                      Click on the button bellow to make a deposit in the amount of the cost!
                    </Text>
                  </Box>

                  <Box mb={40}>
                    <Accordion>
                      <AccordionItem>
                        <AccordionButton onClick={deposit}>
                          <Box as="span" flex="1" textAlign="center">
                            Deposit
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Text pt={4} fontSize="x-large" align="left">
                            {depositReceipt.map((line, index) => (
                              <li key={index}>{line}</li>
                            ))}
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </Flex>
              )
            ) : null}
          </Flex>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Deposit;
