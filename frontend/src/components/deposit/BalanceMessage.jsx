import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function BalanceMessage({ signer, contractAddress, contractABI, isDeposited, isPausedLoading, setIsPaused, setIsContractStatusChecked, setIsPausedLoading }) {
  const checkIsPaused = async () => {
    try {
      setIsPausedLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      const isPaused = await SongRegister.isPaused();

      setIsPaused(isPaused);
      setIsPausedLoading(false);
      setIsContractStatusChecked(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box w={820} mb={20}>
      <Center>
        {isDeposited ? (
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Text as="b" fontSize={25}>
              You have a sufficient balance!
            </Text>
            <Text as="b" mt={40} mb={20} fontSize={20}>
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
              But don't worry!
            </Text>
            <Text mt={20} mb={20} fontSize={20}>
              You can make a deposit for the current cost.
            </Text>
            <Text mt={20} mb={20} fontSize={20}>
              First, check if the Song Register contract is accepting deposits...
            </Text>
            <Center>
              <Button isLoading={isPausedLoading} loadingText="Checking..." fontSize={20} mt={20} onClick={checkIsPaused}>
                Check the Contract Status
              </Button>
            </Center>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default BalanceMessage;
