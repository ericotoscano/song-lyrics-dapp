import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Center, Flex, OrderedList, List, ListItem, Text } from '@chakra-ui/react';
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
                  <Box>
                    <Center>
                      <Text as="mark" px="0.75em" py="0.75em" borderRadius="1em" textColor="black" bgColor="rgba(43, 211, 160, 0.87)" mt={20} mb={20} fontSize={20}>
                        Current Account Connected: {accountFormatted}
                      </Text>
                    </Center>
                  </Box>

                  <Box>
                    <Center>
                      <Accordion allowToggle mt={20} maxWidth={400}>
                        <AccordionItem>
                          <AccordionButton _expanded={{ bg: 'tomato', color: 'yellow' }}>
                            <Box as="span" flex="1" textAlign="center">
                              How to Connect Another Account?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel>
                            <Text fontSize={20} as="b" mt={20}>
                              If in anytime you want to change the current account, follow the steps bellow:
                            </Text>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </Center>
                  </Box>

                  <List paddingInlineStart={0} m={0}>
                    <OrderedList fontSize={20} paddingInlineStart={0}>
                      <ListItem>
                        <Text fontSize={20}>Open your browser's wallet extension.</Text>
                      </ListItem>

                      <ListItem>
                        <Text fontSize={20}>Change current account and connect it to this site.</Text>
                      </ListItem>

                      <ListItem>
                        <Text fontSize={20}>Refresh this page and click on the button "Connect your account"</Text>
                      </ListItem>
                    </OrderedList>
                  </List>
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
