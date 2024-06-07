import MainHeadings from './components/headings/MainHeadings';
import Account from './components/account/Account';
import Contract from './components/contract/Contract';
import Options from './components/options/Options';
import Footer from './components/footer/Footer';

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
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerReceipt, setRegisterReceipt] = useState([]);
  const [isListed, setIsListed] = useState('');
  const [songList, setSongList] = useState([]);

  const REGISTER_ADDRESS = '0x26D7a7FA3Bfe6dC02C6B68346d3915d4c6e6A6F1';
  const REGISTER_ABI = [
    { inputs: [{ internalType: 'uint256', name: '_cost', type: 'uint256' }], stateMutability: 'nonpayable', type: 'constructor' },
    { inputs: [], name: 'NotOwner', type: 'error' },
    { inputs: [], name: 'Paused', type: 'error' },
    { inputs: [], name: 'ValueMustBeEqualCost', type: 'error' },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'songwriter', type: 'address' },
        { indexed: false, internalType: 'string', name: 'songTitle', type: 'string' },
        { indexed: false, internalType: 'string', name: 'songSignature', type: 'string' },
      ],
      name: 'Registered',
      type: 'event',
    },
    { inputs: [], name: 'cost', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [],
      name: 'getSongs',
      outputs: [
        {
          components: [
            { internalType: 'string', name: 'title', type: 'string' },
            { internalType: 'string', name: 'signature', type: 'string' },
          ],
          internalType: 'struct SongRegister.Song[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'isPaused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [
        { internalType: 'string', name: '_title', type: 'string' },
        { internalType: 'string', name: '_signature', type: 'string' },
      ],
      name: 'register',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    { inputs: [], name: 'switchIsPaused', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [], name: 'withdraw', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  ];

  return (
    <Box w="100%" as="samp">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <MainHeadings />

          <Account account={account} accountFormatted={accountFormatted} setAccount={setAccount} setAccountFormatted={setAccountFormatted} setSigner={setSigner} />

          <Contract contractAddress={REGISTER_ADDRESS} />

          {account ? (
            <Options
              account={account}
              accountFormatted={accountFormatted}
              signer={signer}
              contractAddress={REGISTER_ADDRESS}
              contractABI={REGISTER_ABI}
              title={title}
              lyrics={lyrics}
              lyricsByLine={lyricsByLine}
              isSubmitted={isSubmitted}
              isEncrypted={isEncrypted}
              songSignature={songSignature}
              isRegistered={isRegistered}
              registerReceipt={registerReceipt}
              isListed={isListed}
              songList={songList}
              setTitle={setTitle}
              setLyrics={setLyrics}
              setLyricsByLine={setLyricsByLine}
              setIsSubmitted={setIsSubmitted}
              setIsEncrypted={setIsEncrypted}
              setSongSignature={setSongSignature}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
              setIsListed={setIsListed}
              setSongList={setSongList}
            />
          ) : (
            <Footer contractAddress={REGISTER_ADDRESS} />
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
