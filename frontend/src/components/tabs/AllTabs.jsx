import TabsHeading from './TabsHeading';
import TabsButtons from './TabsButtons';
import WritePanel from '../write/WritePanel';
import EncryptPanel from '../encrypt/EncryptPanel';
import RegisterPanel from '../register/RegisterPanel';
import PauseWarning from './PauseWarning';

import { Box, Center, Flex, Tabs, TabPanels, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

function AllTabs({
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
  isRegisterButtonClicked,
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
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [isWriteAnotherSongButtonClicked, setIsWriteAnotherSongButtonClicked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkIsPaused = async () => {
      try {
        const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
        const isPaused = await SongRegister.isPaused();
        setIsPaused(isPaused);
      } catch (error) {
        console.log(error.message);
      }
    };
    checkIsPaused();
  }, [tabIndex, isRegisterButtonClicked]);

  return (
    <Box minWidth={850}>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <TabsHeading />
          <Tabs onChange={(index) => setTabIndex(index)} mt={20}>
            <Center>
              <TabsButtons title={title} lyrics={lyrics} songSignature={songSignature} isSubmitted={isSubmitted} isEncrypted={isEncrypted} isRegistered={isRegistered} isPaused={isPaused} />
            </Center>

            <Box mt={40} minWidth={850}>
              <Center>
                {!isPaused ? (
                  <TabPanels>
                    <WritePanel
                      title={title}
                      lyrics={lyrics}
                      isSubmitted={isSubmitted}
                      isRegistered={isRegistered}
                      setTitle={setTitle}
                      setLyrics={setLyrics}
                      setLyricsByLine={setLyricsByLine}
                      setIsSubmitted={setIsSubmitted}
                      setIsEncrypted={setIsEncrypted}
                      setSongSignature={setSongSignature}
                      setIsRegistered={setIsRegistered}
                      setRegisterReceipt={setRegisterReceipt}
                      setIsWriteAnotherSongButtonClicked={setIsWriteAnotherSongButtonClicked}
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
                    <RegisterPanel
                      signer={signer}
                      contractAddress={contractAddress}
                      contractABI={contractABI}
                      title={title}
                      songSignature={songSignature}
                      isRegistered={isRegistered}
                      registerReceipt={registerReceipt}
                      isWriteAnotherSongButtonClicked={isWriteAnotherSongButtonClicked}
                      isPaused={isPaused}
                      setTitle={setTitle}
                      setLyrics={setLyrics}
                      setLyricsByLine={setLyricsByLine}
                      setIsSubmitted={setIsSubmitted}
                      setIsEncrypted={setIsEncrypted}
                      setSongSignature={setSongSignature}
                      setIsRegistered={setIsRegistered}
                      setRegisterReceipt={setRegisterReceipt}
                      setIsListed={setIsListed}
                      setIsWriteAnotherSongButtonClicked={setIsWriteAnotherSongButtonClicked}
                      setIsRegisterButtonClicked={setIsRegisterButtonClicked}
                      setIsCheckButtonClicked={setIsCheckButtonClicked}
                      setIsPaused={setIsPaused}
                    />
                  </TabPanels>
                ) : (
                  <PauseWarning signer={signer} contractAddress={contractAddress} contractABI={contractABI} setIsPaused={setIsPaused} setIsRegisterButtonClicked={setIsRegisterButtonClicked} />
                )}
              </Center>
            </Box>
          </Tabs>
        </Flex>
      </Center>
    </Box>
  );
}

export default AllTabs;
