import Title from './Title';
import Account from './Account';
import Options from './Options';

import { Box, Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [account, setAccount] = useState('');
  const [accountFormatted, setAccountFormatted] = useState('');
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerReceipt, setRegisterReceipt] = useState([]);

  return (
    <Box w="100vw" as="samp">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Title />

          <Account account={account} accountFormatted={accountFormatted} setAccount={setAccount} setAccountFormatted={setAccountFormatted} setSigner={setSigner} />

          {account ? (
            <Options
              account={account}
              accountFormatted={accountFormatted}
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
              isRegistered={isRegistered}
              registerReceipt={registerReceipt}
              setTitle={setTitle}
              setLyrics={setLyrics}
              setLyricsByLine={setLyricsByLine}
              setIsSubmitted={setIsSubmitted}
              setIsEncrypted={setIsEncrypted}
              setSongSignature={setSongSignature}
              setIsChecked={setIsChecked}
              setIsDeposited={setIsDeposited}
              setDepositReceipt={setDepositReceipt}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
            />
          ) : null}
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
