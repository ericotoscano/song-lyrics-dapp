import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  color,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [account, setAccount] = useState('');

  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      const account = accounts[0];
      setAccount(account);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function encryptData() {
    const nameHash = ethers.utils.hashMessage(userName);
    const titleHash = ethers.utils.hashMessage(title);
    const lyricsHash = ethers.utils.hashMessage(lyrics);
  }

  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Heading mb={10} fontSize={35}>
            Crypto Songs Lyrics
          </Heading>

          <Text mb={10} fontSize={20}>
            A cryptography way to prove authenticity of your songs lyrics ideas.
          </Text>

          <Button mb={10} mt={20} onClick={getAccount}>
            Connect your account
          </Button>

          {account ? (
            <Text mb={0} fontSize={20}>
              Current Account Connected: {account}
            </Text>
          ) : (
            <Text mb={0} fontSize={20}>
              None Account Connected
            </Text>
          )}
        </Flex>
      </Center>

      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Tabs marginTop={40}>
            <TabList justifyContent={'center'} marginBottom={40}>
              <Tab marginInline={10}>Write</Tab>
              <Tab marginInline={10}>Encrypt</Tab>
              <Tab marginInline={10}>Register</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Heading fontSize={30}>Songwriter</Heading>
                <Input onChange={(e) => setUserName(e.target.value)} placeholder="Type name here..." color="black" mt={2} size="md" w="500px" textAlign="left" p={6} bgColor="white" fontSize={20} />

                <Heading fontSize={30}>Title</Heading>
                <Input onChange={(e) => setTitle(e.target.value)} placeholder="Type title here..." color="black" mt={2} size="md" w="500px" textAlign="left" p={6} bgColor="white" fontSize={20} />

                <Heading fontSize={30}>Lyrics</Heading>
                <Textarea
                  onChange={(e) => setLyrics(e.target.value)}
                  placeholder="Type lyrics here..."
                  color="black"
                  mt={2}
                  size="md"
                  w="500px"
                  h="200px"
                  textAlign="left"
                  p={6}
                  bgColor="white"
                  fontSize={20}
                />
              </TabPanel>

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
                        <Heading size="xs">Songwriter</Heading>
                        <Text pt="2" fontSize="large">
                          {userName}
                        </Text>
                      </Box>

                      <Box>
                        <Heading size="xs">Song Name</Heading>
                        <Text pt="2" fontSize="large">
                          {title}
                        </Text>
                      </Box>

                      <Box>
                        <Heading size="xs">Lyrics</Heading>
                        <Text pt="2" fontSize="large">
                          {lyrics}
                        </Text>
                      </Box>
                    </Stack>
                    <Button fontSize={20} onClick={encryptData} mt={36}>
                      Encrypt Song Data
                    </Button>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
