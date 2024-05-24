import TabsButtons from './TabsButtons';
import WritePanel from './write/WritePanel';
import EncryptPanel from './encrypt/EncryptPanel';
import DepositPanel from './deposit/DepositPanel';
import RegisterPanel from './register/RegisterPanel';

import { Box, Center, Tabs, TabPanels } from '@chakra-ui/react';

function AllTabs({
  account,
  accountFormatted,
  signer,
  title,
  lyrics,
  lyricsByLine,
  isSubmitted,
  isEncrypted,
  songSignature,
  isChecked,
  isDeposited,
  depositReceipt,
  isRegistered,
  registerReceipt,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsChecked,
  setIsDeposited,
  setDepositReceipt,
  setIsRegistered,
  setRegisterReceipt,
}) {
  const REGISTER_ADDRESS = '0x380abCe4Dfe7b35a365857c380f18A2119675dd9';
  const REGISTER_ABI = [
    { inputs: [{ internalType: 'uint256', name: '_cost', type: 'uint256' }], stateMutability: 'nonpayable', type: 'constructor' },
    { inputs: [], name: 'NoBalance', type: 'error' },
    { inputs: [], name: 'NoFunds', type: 'error' },
    { inputs: [], name: 'NotOwner', type: 'error' },
    { inputs: [], name: 'Paused', type: 'error' },
    { inputs: [], name: 'Unpaused', type: 'error' },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: '_account', type: 'address' },
        { indexed: false, internalType: 'uint256', name: '_deposit', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: '_balance', type: 'uint256' },
      ],
      name: 'Deposited',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: '_writer', type: 'address' },
        { indexed: false, internalType: 'string', name: '_hash', type: 'string' },
      ],
      name: 'Registered',
      type: 'event',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'balances',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'cost', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'deposit', outputs: [], stateMutability: 'payable', type: 'function' },
    {
      inputs: [{ internalType: 'address', name: '_songwriter', type: 'address' }],
      name: 'getSongs',
      outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'isPaused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ internalType: 'string', name: '_songHash', type: 'string' }], name: 'register', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [], name: 'withdraw', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  ];
  return (
    <Box>
      <Center>
        <Tabs mt={20}>
          <Center>
            <TabsButtons title={title} lyrics={lyrics} isSubmitted={isSubmitted} isEncrypted={isEncrypted} songSignature={songSignature} isDeposited={isDeposited} />
          </Center>

          <Box>
            <Center>
              <TabPanels>
                <WritePanel
                  title={title}
                  lyrics={lyrics}
                  isSubmitted={isSubmitted}
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
                <EncryptPanel
                  accountFormatted={accountFormatted}
                  title={title}
                  lyricsByLine={lyricsByLine}
                  isEncrypted={isEncrypted}
                  songSignature={songSignature}
                  setIsEncrypted={setIsEncrypted}
                  setSongSignature={setSongSignature}
                />
                <DepositPanel
                  account={account}
                  accountFormatted={accountFormatted}
                  contractAddress={REGISTER_ADDRESS}
                  contractABI={REGISTER_ABI}
                  signer={signer}
                  isChecked={isChecked}
                  isDeposited={isDeposited}
                  depositReceipt={depositReceipt}
                  setIsChecked={setIsChecked}
                  setIsDeposited={setIsDeposited}
                  setDepositReceipt={setDepositReceipt}
                />
                <RegisterPanel
                  account={account}
                  accountFormatted={accountFormatted}
                  signer={signer}
                  contractAddress={REGISTER_ADDRESS}
                  contractABI={REGISTER_ABI}
                  songSignature={songSignature}
                  isRegistered={isRegistered}
                  registerReceipt={registerReceipt}
                  setIsRegistered={setIsRegistered}
                  setRegisterReceipt={setRegisterReceipt}
                />
              </TabPanels>
            </Center>
          </Box>
        </Tabs>
      </Center>
    </Box>
  );
}

export default AllTabs;
