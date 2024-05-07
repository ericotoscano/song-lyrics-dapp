import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Stack, StackDivider, TabPanel, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ethers } from 'ethers';

function Encrypt({ account, title, lyrics, songSignature, setSongSignature }) {
  const [lyricsByLine, setLyricsByLine] = useState(['']);

  function encryptData() {
    setSongSignature(ethers.utils.hashMessage(title + '' + lyrics));
  }

  return (
    
    <TabPanel>
      <Card>
        <CardHeader>
          <Heading size="md" fontSize={30}>
            Song Report
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="2">
            <Box>
              <Heading size="xs">Songwriter Account</Heading>
              <Text pt="2" fontSize="large">
                {account}
              </Text>
            </Box>

            <Box>
              <Heading size="xs">Song Title</Heading>
              <Text pt="2" fontSize="large">
                {title}
              </Text>
            </Box>

            <Box>
              <Heading size="xs">Song Lyrics</Heading>
              <Text pt="2" fontSize="large">
                {lyrics}
              </Text>
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
              <Heading size="xs">Song Signature</Heading>
              <Text pt="2" fontSize="large">
                {songSignature}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </TabPanel>
  );
}

export default Encrypt;
