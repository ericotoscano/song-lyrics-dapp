import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function Result({
  signer,
  contractAddress,
  contractABI,
  isChecked,
  isDeposited,
  currentCostInEther,
  currentCostInGwei,
  setCurrentBalanceInGwei,
  isDepositLoading,
  setIsDepositLoading,
  setIsDeposited,
  setDepositHash,
  setDepositReceipt,
}) {
  const deposit = async () => {
    try {
      setIsDepositLoading(true);

      const currentCostInWei = currentCostInGwei * 1000000000;

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await SongRegister.connect(signer).deposit({ value: currentCostInWei, gasLimit: 50000 });

      SongRegister.on('Deposited', async (sender, value, balance) => {
        const depositedByLine = [];

        depositedByLine.push('Sender');
        depositedByLine.push(sender);
        depositedByLine.push('Deposit Value');
        depositedByLine.push(`${parseInt(ethers.utils.formatUnits(value, 'gwei'))} Gwei (${ethers.utils.formatUnits(value, 'ether')} Ether)`);
        depositedByLine.push('Current Balance');
        depositedByLine.push(`${parseInt(ethers.utils.formatUnits(balance, 'gwei'))} Gwei (${ethers.utils.formatUnits(balance, 'ether')} Ether)`);
        depositedByLine.push('Current Cost');
        depositedByLine.push(`${currentCostInGwei} Gwei (${currentCostInEther} Ether)`);

        const receipt = await tx.wait();

        setDepositReceipt(depositedByLine);
        setDepositHash(receipt.transactionHash);
        setIsDepositLoading(false);

        setCurrentBalanceInGwei(parseInt(ethers.utils.formatUnits(balance, 'gwei')));

        if (parseInt(ethers.utils.formatUnits(balance, 'gwei')) >= currentCostInGwei) {
          setIsDeposited(true);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box w={820} mb={40}>
      <Center>
        {isChecked ? (
          isDeposited ? (
            <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
              <Text as="b" mt={20} fontSize={20}>
                You have a sufficient balance!
              </Text>
              <Text as="b" mt={40} fontSize={20}>
                <Highlight query="Register" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
                  Go to Register to continue...
                </Highlight>
              </Text>
            </Flex>
          ) : (
            <Box w={820}>
              <Text as="b" mt={20} mb={20} fontSize={20} color={'tomato'}>
                You don't have enough balance!
              </Text>

              <Text mt={20} mb={20} fontSize={20}>
                You can make a deposit for the cost by clicking on the button below...
              </Text>
              <Center>
                <Button isLoading={isDepositLoading} loadingText="Depositing..." fontSize={20} mt={20} onClick={deposit}>
                  Deposit
                </Button>
              </Center>
            </Box>
          )
        ) : null}
      </Center>
    </Box>
  );
}

export default Result;
