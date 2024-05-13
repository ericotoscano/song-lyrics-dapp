import { Box, Button, Center, Flex, Highlight, OrderedList, List, ListItem, Text } from '@chakra-ui/react';
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
                  <Text as="mark" px="0.5em" py="0.5em" borderRadius="10" textColor="black" bgColor="rgba(43, 211, 160, 0.87)" mb={20} fontSize={20}>
                    Current Account Connected: {account}
                  </Text>

                  <Center>
                    <List>
                      <Center>
                        <Text mb={0} fontSize={20} as="b">
                          If anytime you want to change the current account, follow the steps bellow:
                        </Text>
                      </Center>

                      <Center>
                        <OrderedList fontSize={18}>
                          <ListItem p={2}>
                            <Text mb={0} fontSize={20}>
                              Open your browser's wallet extension.
                            </Text>
                          </ListItem>

                          <ListItem p={2}>
                            <Text mb={0} fontSize={20}>
                              Change current account and connect it to this site.
                            </Text>
                          </ListItem>

                          <ListItem p={2}>
                            <Text mb={0} fontSize={20}>
                              Refresh this page and click on the button "Connect your account"
                            </Text>
                          </ListItem>
                        </OrderedList>
                      </Center>
                    </List>
                  </Center>
                </Flex>
              </Center>
            </Box>
          ) : (
            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  <Text as="mark" px="0.5em" py="0.5em" borderRadius="10" textColor="white" bgColor="red" mb={20} fontSize={20}>
                    None Account Connected
                  </Text>
                  <Button mb={20} mt={20} onClick={getAccount}>
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
