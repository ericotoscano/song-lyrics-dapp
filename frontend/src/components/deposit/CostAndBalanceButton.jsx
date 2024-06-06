import { Box, Button, Center, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function BalanceReceipt({
  account,
  signer,
  contractAddress,
  contractABI,
  isBalanceLoading,
  setIsChecked,
  setIsDeposited,
  setCurrentCostInEther,
  setCurrentCostInGwei,
  setCurrentBalanceInGwei,
  setCurrentBalanceInEther,
  setIsBalanceLoading,
}) {
  const getCostAndBalance = async () => {
    try {
      setIsBalanceLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);

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
      setIsBalanceLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box w={820}>
      <Text fontSize={20}>Let's check your balance and the current cost to register a song.</Text>
      <Box>
        <Center>
          <Button isLoading={isBalanceLoading} loadingText="Checking Cost and Balance..." fontSize={20} mt={20} mb={40} onClick={getCostAndBalance}>
            Check Cost and Balance
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default BalanceReceipt;
