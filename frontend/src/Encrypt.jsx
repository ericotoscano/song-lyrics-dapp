import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Card, CardBody, CardHeader, Center, Flex, Heading, Stack, StackDivider, TabPanel, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function Encrypt({ account, title, lyrics, lyricsByLine, songSignature, setIsEncrypted, setSongSignature }) {
  function getSignature() {
    setSongSignature(ethers.utils.hashMessage(title + '' + lyrics));
    setIsEncrypted(true);
  }

  return (
    <Box>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <TabPanel>
            <Card>
              <Center>
                <CardHeader>
                  <Heading fontSize={30}>Song Report</Heading>
                </CardHeader>
              </Center>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="0">
                  <Box>
                    <Heading size="xs">Songwriter Account</Heading>
                    <Text pt="0" fontSize="x-large">
                      {account}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="xs">Song Title</Heading>
                    <Text pt="0" fontSize="x-large">
                      {title}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="xs">Song Lyrics</Heading>
                    <Text pt="0" fontSize="x-large">
                      {lyricsByLine.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </Text>
                  </Box>

                  <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                      <Center>
                        <AccordionButton onClick={getSignature}>
                          <Box as="span" flex="1" textAlign="center">
                            Get Song Signature
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </Center>

                      <AccordionPanel pb={4}>
                        <Box>
                          <Text pt="0" fontSize="x-large">
                            Now your song has a unique signature, which is:
                          </Text>
                          <Center>
                            <Text as="mark" textColor="black" bgColor="rgba(43, 211, 160, 0.87)" pt="0" fontSize="x-large">
                              {songSignature}
                            </Text>
                          </Center>

                          <Text pt="0" fontSize="x-large">
                            If you try to change anything in your song, this signature will change too.
                          </Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Stack>
              </CardBody>
            </Card>
          </TabPanel>
        </Flex>
      </Center>
    </Box>
  );
}

export default Encrypt;
