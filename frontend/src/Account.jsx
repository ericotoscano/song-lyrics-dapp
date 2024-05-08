import { Box, Button, Center, Flex, OrderedList, ListItem, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function Account({ account, setAccount, setSigner }) {
  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (account !== accounts[0]) {
        setAccount(accounts[0]);
        setSigner(provider.getSigner(accounts[0]));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          {account ? (
            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  <Text as="mark" textColor="black" bgColor="rgba(43, 211, 160, 0.87)" mb={20} fontSize={20}>
                    Current Account Connected: {account}
                  </Text>
                  <Text mb={0} fontSize={20}>
                    If you want to change the current account, follow the steps bellow:
                  </Text>
                  <OrderedList fontSize={18}>
                    <ListItem>Open your wallet app.</ListItem>
                    <ListItem>Change account and connect it to this site.</ListItem>
                    <ListItem>After that, refresh this page and click on the button "Connect your account".</ListItem>
                  </OrderedList>
                </Flex>
              </Center>
            </Box>
          ) : (
            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  <Text as="mark" textColor="white" bgColor="red" mb={20} fontSize={20}>
                    None Account Connected
                  </Text>
                  <Button mb={20} mt={20} fontSize={20} onClick={getAccount}>
                    Connect your account
                  </Button>
                </Flex>
              </Center>
            </Box>
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Account;
