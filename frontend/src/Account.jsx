import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function Account({ account, setAccount, setSigner }) {
  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (account !== accounts[0]) {
        setAccount(accounts[0]);
      }

      setSigner(provider.getSigner(accounts[0]));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Button mb={10} mt={20} onClick={getAccount}>
            Connect your account
          </Button>

          {account ? (
            <Text mb={0} fontSize={20}>
              Current Account Connected: {account}
            </Text>
          ) : (
            <Text mb={0} fontSize={20}>
              None Account Connected
            </Text>
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Account;
