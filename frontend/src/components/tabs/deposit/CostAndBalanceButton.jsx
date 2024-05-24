import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function CostAndBalanceButton({
  account,
  contractAddress,
  contractABI,
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
            <Text as="em" fontSize="x-large" align="center" color="#f1c550" mb={15}>
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
                  <Box mb={15}>
                    <Text as="em" fontSize="x-large" align="center" color="#f1c550">
                      {line}
                    </Text>
                  </Box>
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
