import RegisterHeading from './RegisterHeading';
import RegisterReceipt from './RegisterReceipt';
import RegisterButton from './RegisterButton';
import AnotherSongMessage from './AnotherSongMessage';
import WriteAnotherSongButton from './WriteAnotherSongButton';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';

function RegisterPanel({
  signer,
  contractAddress,
  contractABI,
  title,
  songSignature,
  isRegistered,
  registerReceipt,
  isWriteAnotherSongButtonClicked,
  isPaused,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsRegistered,
  setRegisterReceipt,
  setIsListed,
  setIsRegisterButtonClicked,
  setIsCheckButtonClicked,
  setIsWriteAnotherSongButtonClicked,
}) {
  const [registerHash, setRegisterHash] = useState('');

  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            <RegisterHeading />

            {isRegistered ? (
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <RegisterReceipt registerReceipt={registerReceipt} registerHash={registerHash} />

                {isWriteAnotherSongButtonClicked ? (
                  <AnotherSongMessage />
                ) : (
                  <WriteAnotherSongButton
                    setTitle={setTitle}
                    setLyrics={setLyrics}
                    setLyricsByLine={setLyricsByLine}
                    setIsSubmitted={setIsSubmitted}
                    setIsEncrypted={setIsEncrypted}
                    setSongSignature={setSongSignature}
                    setIsRegistered={setIsRegistered}
                    setIsRegisterButtonClicked={setIsRegisterButtonClicked}
                    setIsCheckButtonClicked={setIsCheckButtonClicked}
                    setIsWriteAnotherSongButtonClicked={setIsWriteAnotherSongButtonClicked}
                  />
                )}
              </Flex>
            ) : (
              <RegisterButton
                signer={signer}
                contractAddress={contractAddress}
                contractABI={contractABI}
                title={title}
                songSignature={songSignature}
                isPaused={isPaused}
                setIsRegistered={setIsRegistered}
                setRegisterReceipt={setRegisterReceipt}
                setIsListed={setIsListed}
                setRegisterHash={setRegisterHash}
              />
            )}
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default RegisterPanel;
