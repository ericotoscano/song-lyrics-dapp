import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Highlight, Stack, StackDivider, TabPanel, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function Encrypt({ account, title, lyrics, lyricsByLine, isEncrypted, songSignature, setIsEncrypted, setSongSignature }) {
  function getSignature() {
    setSongSignature(ethers.utils.hashMessage(title + '' + lyrics));
    setIsEncrypted(true);
  }

  return (
    <Box>
      <Center>
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
                  <Text fontSize="x-large">{account}</Text>
                </Box>

                <Box>
                  <Heading size="xs">Song Title</Heading>
                  <Text fontSize="x-large">{title}</Text>
                </Box>

                <Box>
                  <Heading size="xs">Song Lyrics</Heading>
                  <Text fontSize="x-large">
                    {lyricsByLine.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </Text>
                </Box>

                <Box>
                  <Center>
                    <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                      {isEncrypted ? (
                        <Box>
                          <Center>
                            <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                              <Text as="b" mt={20} fontSize={20}>
                                This is your song signature:
                              </Text>

                              <Text as="mark" px="0.5em" py="0.5em" borderRadius="10" textColor="black" bgColor="rgba(43, 211, 160, 0.87)" mt={20} fontSize={20}>
                                {songSignature}
                              </Text>

                              <Text as="b" mt={40} mb={20} fontSize={20}>
                                <Highlight query="Deposit" styles={{ px: '0.5em', py: '0.5em', borderRadius: '10', bg: 'rgba(43, 211, 160, 0.87)', color: 'white' }}>
                                  Click on Deposit Tab to continue...
                                </Highlight>
                              </Text>
                            </Flex>
                          </Center>
                        </Box>
                      ) : (
                        <Box>
                          <Center>
                            <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                              <Button fontSize={20} mt={20} mb={20} onClick={getSignature}>
                                Get Song Signature
                              </Button>
                            </Flex>
                          </Center>
                        </Box>
                      )}
                    </Flex>
                  </Center>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Encrypt;
