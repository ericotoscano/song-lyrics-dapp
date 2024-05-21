import { Box, Button, Center, Flex, OrderedList, List, ListItem, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAccount } from './utils/formatAccount';

function Account({ account, accountFormatted, setAccount, setAccountFormatted, setSigner }) {
  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (account !== accounts[0]) {
        const account = formatAccount(accounts[0]);

        setAccount(accounts[0]);
        setAccountFormatted(account);
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
                  <Text as="mark" px="0.75em" py="0.75em" borderRadius="1em" textColor="black" bgColor="rgba(43, 211, 160, 0.87)" mt={20} mb={20} fontSize={20}>
                    Current Account Connected: {accountFormatted}
                  </Text>
                </Flex>
              </Center>
            </Box>
          ) : (
            <Box>
              <Center>
                <Button mb={20} mt={20} onClick={getAccount}>
                  Connect Your Account
                </Button>
              </Center>
            </Box>
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Account;
