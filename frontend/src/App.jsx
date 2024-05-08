import Title from './Title';
import Tabulation from './Tabulation';
import Account from './Account';

import { Box, Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [songSignature, setSongSignature] = useState('');
  const [depositReceipt, setDepositReceipt] = useState('');

  return (
    <Box as="samp" w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Title />

          <Account account={account} setAccount={setAccount} setSigner={setSigner} />

          <Tabulation
            account={account}
            signer={signer}
            title={title}
            lyrics={lyrics}
            songSignature={songSignature}
            setTitle={setTitle}
            setLyrics={setLyrics}
            setSongSignature={setSongSignature}
            depositReceipt={depositReceipt}
            setDepositReceipt={setDepositReceipt}
          />
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
