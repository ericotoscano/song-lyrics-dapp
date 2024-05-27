import Question from './Question';
import CheckButton from './CheckButton';
import RegisterButton from './RegisterButton';
import AllTabs from '../tabs/AllTabs';

import { Box, Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function Options({
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
  const [isCheckButtonClicked, setIsCheckButtonClicked] = useState(false);
  const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);

  return (
    <Box mt={20}>
      <Center>
        <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          <Question />

          <RegisterButton setIsCheckButtonClicked={setIsCheckButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />
          <CheckButton setIsCheckButtonClicked={setIsCheckButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />

          {isRegisterButtonClicked ? (
            <AllTabs
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
          ) : isCheckButtonClicked ? (
            <Question />
          ) : null}
        </Flex>
      </Center>
    </Box>
  );
}

export default Options;
