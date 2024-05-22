import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Center, OrderedList, List, ListItem, Text } from '@chakra-ui/react';

function Instruction() {
  return (
    <Box mt={20}>
      <Center>
        <Accordion allowToggle maxWidth={400} textColor="#f1c550">
          <AccordionItem mb={0}>
            <AccordionButton bgColor="#29a19c">
              <Box as="span" flex="1" textAlign="center">
                How to Connect Another Account?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <Center>

              <AccordionPanel maxWidth={380}>
                <Center>
                  <List mb={0}>
                    <OrderedList fontSize={20} paddingInlineStart={0}>
                      <ListItem>
                        <Text fontSize={20}>Open your browser's wallet extension.</Text>
                      </ListItem>

                      <ListItem>
                        <Text fontSize={20}>Change current account and connect it to this site.</Text>
                      </ListItem>

                      <ListItem>
                        <Text fontSize={20}>Refresh this page and click on "Connect your account".</Text>
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

export default Instruction;
