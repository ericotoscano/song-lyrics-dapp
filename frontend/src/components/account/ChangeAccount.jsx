import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Center, OrderedList, List, ListItem, Text } from '@chakra-ui/react';

function ChangeAccount() {
  return (
    <Box mt={20}>
      <Center>
        <Accordion allowToggle textColor="#f1c550">
          <AccordionItem mb={0}>
            <AccordionButton bgColor="#29a19c" minWidth={500}>
              <Box as="span" flex="1" textAlign="center">
                How to Connect Another Account?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <Center>
              <AccordionPanel maxWidth={500}>
                <Center>
                  <List mb={0}>
                    <OrderedList fontSize={20} paddingInline={0} m={10} >
                      <ListItem>
                        <Text fontSize={20}>Open your Metamask browser's extension</Text>
                      </ListItem>

                      <ListItem>
                        <Text fontSize={20}>Change the current account and connect it to this site</Text>
                      </ListItem>

                      <ListItem>
                        <Text fontSize={20}>Refresh this page and click on "Connect your account"</Text>
                      </ListItem>
                    </OrderedList>
                  </List>
                </Center>
              </AccordionPanel>
            </Center>
          </AccordionItem>
        </Accordion>
      </Center>
    </Box>
  );
}

export default ChangeAccount;
