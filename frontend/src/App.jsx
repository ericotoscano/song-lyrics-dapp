import Account from './Account';
import Write from './Write';
import Encrypt from './Encrypt';
import Deposit from './Deposit';
import { Box, Center, Flex, Heading, Text, Tabs, TabList, TabPanels, Tab } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [songSignature, setSongSignature] = useState('');

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

          <Account account={account} setAccount={setAccount} setSigner={setSigner} />

          <Tabs justifyContent={'center'} marginTop={40}>
            <TabList justifyContent={'center'} marginBottom={20}>
              <Tab marginInline={10}>Write</Tab>
              <Tab marginInline={10}>Encrypt</Tab>
              <Tab marginInline={10}>Deposit</Tab>
              <Tab marginInline={10}>Register</Tab>
            </TabList>

            <TabPanels>
              <Write setTitle={setTitle} setLyrics={setLyrics} />
              <Encrypt account={account} title={title} lyrics={lyrics} songSignature={songSignature} setSongSignature={setSongSignature} />
              <Deposit account={account} signer={signer} songSignature={songSignature} />
            </TabPanels>
          </Tabs>
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
