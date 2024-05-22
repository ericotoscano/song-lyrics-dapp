import Headings from './Headings';
import Check from './Check';
import Register from './Register';
import NewSong from '../NewSong';

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

  const deposit = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBalance = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box mt={20}>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Headings />

          <Flex alignItems={'center'} justifyContent="center" flexDirection={'row'}>
            <Register setIsCheckButtonClicked={setIsCheckButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />
            <Check setIsCheckButtonClicked={setIsCheckButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />
          </Flex>

          {isRegisterButtonClicked ? (
            <NewSong
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
            <Headings />
          ) : null}
        </Flex>
      </Center>
    </Box>
  );
}

export default Options;

{
  /* <Tabulation
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
/>; */
}
