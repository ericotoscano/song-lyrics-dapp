import Question from './Question';
import CheckButton from './CheckButton';
import RegisterButton from './RegisterButton';
import AllTabs from '../tabs/AllTabs';
import Songs from '../songs/Songs';

import { Box, Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function Options({
  account,
  accountFormatted,
  signer,
  contractAddress,
  contractABI,
  title,
  lyrics,
  lyricsByLine,
  isSubmitted,
  isEncrypted,
  songSignature,
  isRegistered,
  registerReceipt,
  isListed,
  songList,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsRegistered,
  setRegisterReceipt,
  setIsListed,
  setSongList,
}) {
  const [isCheckButtonClicked, setIsCheckButtonClicked] = useState(false);
  const [isRegisterButtonClicked, setIsRegisterButtonClicked] = useState(false);

  return (
    <Box minWidth={850} mt={20}>
      <Center>
        <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          <Question />

          <RegisterButton isRegisterButtonClicked={isRegisterButtonClicked} setIsCheckButtonClicked={setIsCheckButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />

          <CheckButton setIsCheckButtonClicked={setIsCheckButtonClicked} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />

          {isRegisterButtonClicked ? (
            <AllTabs
              account={account}
              accountFormatted={accountFormatted}
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              title={title}
              lyrics={lyrics}
              lyricsByLine={lyricsByLine}
              isSubmitted={isSubmitted}
              isEncrypted={isEncrypted}
              songSignature={songSignature}
              isRegistered={isRegistered}
              registerReceipt={registerReceipt}
              isRegisterButtonClicked={isRegisterButtonClicked}
              setTitle={setTitle}
              setLyrics={setLyrics}
              setLyricsByLine={setLyricsByLine}
              setIsSubmitted={setIsSubmitted}
              setIsEncrypted={setIsEncrypted}
              setSongSignature={setSongSignature}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
              setIsRegisterButtonClicked={setIsRegisterButtonClicked}
              setIsListed={setIsListed}
            />
          ) : isCheckButtonClicked ? (
            <Songs
              account={account}
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              isListed={isListed}
              isRegistered={isRegistered}
              songList={songList}
              setIsListed={setIsListed}
              setIsRegistered={setIsRegistered}
              setSongList={setSongList}
            />
          ) : null}
        </Flex>
      </Center>
    </Box>
  );
}

export default Options;
