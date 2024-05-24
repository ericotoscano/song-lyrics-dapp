import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAccount } from '../../../utils/formatter';

function Result({ signer, contractAddress, contractABI, isChecked, isDeposited, currentCostInGwei, setCurrentBalanceInGwei, isDepositLoaded, setIsDepositLoaded, setIsDeposited, setDepositReceipt }) {
  const deposit = async () => {
    try {
      setIsDepositLoaded(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
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
        ) : (
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
        )
      ) : null}
    </Box>
  );
}

export default Result;
