import RegisterHeading from './RegisterHeading';
import RegisterReceipt from './RegisterReceipt';
import RegisterButton from './RegisterButton';
import CloseReceiptButton from './CloseReceiptButton';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import ErrorWarning from './ErrorWarning';

function RegisterPanel({
  account,
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
  const [errorReason, setErrorReason] = useState('');

  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            <RegisterHeading />

            {isRegistered ? (
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <RegisterReceipt registerReceipt={registerReceipt} />
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
            ) : !errorReason ? (
              <RegisterButton
                account={account}
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
                setErrorReason={setErrorReason}
              />
            ) : (
              <ErrorWarning setIsRegisterButtonClicked={setIsRegisterButtonClicked} errorReason={errorReason} />
            )}
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default RegisterPanel;
