import { Box, Button, Center, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function DepositButton({
  signer,
  contractAddress,
  contractABI,
  isPaused,
  currentCostInEther,
  currentCostInGwei,
  isDepositLoading,
  setIsDeposited,
  setCurrentBalanceInGwei,
  setIsDepositLoading,
  setDepositHash,
  setDepositReceipt,
}) {
  const deposit = async () => {
    try {
      setIsDepositLoading(true);

      const currentCostInWei = currentCostInGwei * 1000000000;

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      await SongRegister.connect(signer).deposit({ value: currentCostInWei, gasLimit: 50000 });

      SongRegister.on('Deposited', (sender, depositValue, currentBalance, event) => {
        const depositedByLine = [];

        depositedByLine.push(sender);
        depositedByLine.push(`${parseInt(ethers.utils.formatUnits(depositValue, 'gwei'))} Gwei (${ethers.utils.formatUnits(depositValue, 'ether')} Ether)`);
        depositedByLine.push(`${parseInt(ethers.utils.formatUnits(currentBalance, 'gwei'))} Gwei (${ethers.utils.formatUnits(currentBalance, 'ether')} Ether)`);
        depositedByLine.push(`${currentCostInGwei} Gwei (${currentCostInEther} Ether)`);

        setDepositReceipt(depositedByLine);
        setDepositHash(event.transactionHash);
        setCurrentBalanceInGwei(parseInt(ethers.utils.formatUnits(currentBalance, 'gwei')));
        setIsDepositLoading(false);

        if (parseInt(ethers.utils.formatUnits(currentBalance, 'gwei')) >= currentCostInGwei) {
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
        {isPaused ? (
          <Box w={820}>
            <Text as="b" mt={20} mb={20} fontSize={20} color={'tomato'}>
              Currently, the Song Register contract is not accepting deposits!
            </Text>
            <Text mt={20} mb={20} fontSize={20}>
              Try to check the contract status again later.
            </Text>
          </Box>
        ) : (
          <Box w={820}>
            <Text mt={20} mb={20} fontSize={20}>
              All right! Now, you can make a deposit for the current cost...
            </Text>
            <Center>
              <Button isLoading={isDepositLoading} loadingText="Depositing..." fontSize={20} mt={20} onClick={deposit}>
                Make a Deposit
              </Button>
            </Center>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default DepositButton;
