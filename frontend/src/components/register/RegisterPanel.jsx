import RegisterHeading from './RegisterHeading';
import RegisterReceipt from './RegisterReceipt';
import RegisterButton from './RegisterButton';
import CloseReceiptButton from './CloseReceiptButton';

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
  isRegisterLoading,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsRegistered,
  setRegisterReceipt,
  setIsListed,
  setIsRegisterLoading,
  setIsRegisterButtonClicked,
  setIsCheckButtonClicked,
  setTabIndex,
}) {
  const [registerHash, setRegisterHash] = useState('');
  const [blockNumber, setBlockNumber] = useState('');

  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            <RegisterHeading />

            {isRegistered ? (
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <RegisterReceipt registerReceipt={registerReceipt} registerHash={registerHash} blockNumber={blockNumber} />
                <CloseReceiptButton
                  setTitle={setTitle}
                  setLyrics={setLyrics}
                  setLyricsByLine={setLyricsByLine}
                  setIsSubmitted={setIsSubmitted}
                  setIsEncrypted={setIsEncrypted}
                  setSongSignature={setSongSignature}
                  setIsRegistered={setIsRegistered}
                  setIsRegisterButtonClicked={setIsRegisterButtonClicked}
                  setIsCheckButtonClicked={setIsCheckButtonClicked}
                  setTabIndex={setTabIndex}
                />
              </Flex>
            ) : (
              <RegisterButton
                signer={signer}
                contractAddress={contractAddress}
                contractABI={contractABI}
                title={title}
                songSignature={songSignature}
                isRegisterLoading={isRegisterLoading}
                setIsRegistered={setIsRegistered}
                setRegisterReceipt={setRegisterReceipt}
                setIsListed={setIsListed}
                setIsRegisterLoading={setIsRegisterLoading}
                setRegisterHash={setRegisterHash}
                setBlockNumber={setBlockNumber}
              />
            )}
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default RegisterPanel;
