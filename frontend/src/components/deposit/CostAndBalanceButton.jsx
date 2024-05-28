import { Box, Button, Center, Flex, Link, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function CostAndBalanceButton({
  account,
  contractAddress,
  contractABI,
  currentCostInEther,
  currentCostInGwei,
  currentBalanceInGwei,
  currentBalanceInEther,
  isBalanceLoading,
  signer,
  isChecked,
  depositReceipt,
  depositHash,
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
      <Center>
        {isChecked ? (
          depositReceipt.length == 0 ? (
            <Box w={820} mt={20} mb={40}>
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <Text as="em" fontSize="x-large" color="#f1c550" mb={10}>
                  Current Cost: {currentCostInGwei} Gwei ({currentCostInEther} Ether)
                </Text>
                <Text as="em" fontSize="x-large" color="#f1c550">
                  Your Balance: {currentBalanceInGwei} Gwei ({currentBalanceInEther} Ether)
                </Text>
              </Flex>
            </Box>
          ) : (
            <Box w={820} mt={20} mb={40}>
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <Text as="b" mb={40} fontSize={25} color="#f1c550">
                  Successfully Deposited!
                </Text>

                {depositReceipt.map((line, index) => (
                  <li key={index}>
                    <Box mb={15} w={820}>
                      <Text as="em" fontSize="x-large" align="center" color="#f1c550">
                        {line}
                      </Text>
                    </Box>
                  </li>
                ))}

                <Box w={820} mt={20}>
                  <Text as="b" fontSize={20}>
                    See your deposit transaction details on{' '}
                    <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${depositHash}`} isExternal>
                      Polygon Amoy Testnet Explorer
                    </Link>
                  </Text>
                </Box>
              </Flex>
            </Box>
          )
        ) : (
          <Box w={820}>
            <Text fontSize={20}>Let's check your balance and the current cost to register a song.</Text>
            <Box>
              <Center>
                <Button isLoading={isBalanceLoading} loadingText="Checking Cost and Balance..." fontSize={20} mt={20} onClick={getCostAndBalance}>
                  Check Cost and Balance
                </Button>
              </Center>
            </Box>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default CostAndBalanceButton;
