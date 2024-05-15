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
  const [lyricsByLine, setLyricsByLine] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [songSignature, setSongSignature] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isDeposited, setIsDeposited] = useState(false);
  const [depositReceipt, setDepositReceipt] = useState([]);

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
            lyricsByLine={lyricsByLine}
            isSubmitted={isSubmitted}
            isEncrypted={isEncrypted}
            songSignature={songSignature}
            isChecked={isChecked}
            isDeposited={isDeposited}
            depositReceipt={depositReceipt}
            setTitle={setTitle}
            setLyrics={setLyrics}
            setLyricsByLine={setLyricsByLine}
            setIsSubmitted={setIsSubmitted}
            setIsEncrypted={setIsEncrypted}
            setSongSignature={setSongSignature}
            setIsChecked={setIsChecked}
            setIsDeposited={setIsDeposited}
            setDepositReceipt={setDepositReceipt}
          />
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
