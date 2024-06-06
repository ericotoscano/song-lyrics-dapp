import RegisterHeading from './RegisterHeading';
import RegisterButton from './RegisterButton';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';

function RegisterPanel({
  signer,
  contractAddress,
  contractABI,
  title,
  songSignature,
  isRegistered,
  registerReceipt,
  isWriteButtonClicked,
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
  setIsListed,
  setIsWriteButtonClicked,
}) {
  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            {isWriteButtonClicked ? null : <RegisterHeading />}

            <RegisterButton
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              title={title}
              songSignature={songSignature}
              isRegistered={isRegistered}
              registerReceipt={registerReceipt}
              isWriteButtonClicked={isWriteButtonClicked}
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
              setIsListed={setIsListed}
              setIsWriteButtonClicked={setIsWriteButtonClicked}
            />
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default RegisterPanel;
