import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Stack, StackDivider, TabPanel, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

function Encrypt({ account, title, lyricsByLine, songSignature, setSongSignature }) {
  function encryptData() {
    setSongSignature(ethers.utils.hashMessage(title + '' + lyrics));
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
                    <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
                      <Heading size="xs">Songwriter Account</Heading>
                      <Text pt="0" fontSize="x-large">
                        {account}
                      </Text>
                    </Flex>
                  </Box>

                  <Box>
                    <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
                      <Heading size="xs">Song Title</Heading>
                      <Text pt="0" fontSize="x-large">
                        {title}
                      </Text>
                    </Flex>
                  </Box>

                  <Box>
                    <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
                      <Heading size="xs">Song Lyrics</Heading>
                      <Text pt="0" fontSize="x-large">
                        {lyricsByLine.map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </Text>
                    </Flex>
                  </Box>

                  <Box>
                    <Center>
                      <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                        <Button fontSize={20} onClick={encryptData} mt={6}>
                          Encrypt Song Data
                        </Button>
                      </Flex>
                    </Center>
                  </Box>

                  <Box>
                    <Center>
                      <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                        <Heading size="xs">Song Signature</Heading>
                        <Text pt="0" fontSize="x-large">
                          {songSignature}
                        </Text>
                      </Flex>
                    </Center>
                  </Box>
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
