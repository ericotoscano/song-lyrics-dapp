import SongTitleForm from './SongTitleForm';
import SongLyricsForm from './SongLyricsForm';
import GoToEncrypt from './GoToEncrypt';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';

function WritePanel({
  title,
  lyrics,
  isSubmitted,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsRegistered,
  setRegisterReceipt,
  setIsWriteAnotherSongButtonClicked,
}) {
  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <SongTitleForm
              title={title}
              isSubmitted={isSubmitted}
              setTitle={setTitle}
              setIsSubmitted={setIsSubmitted}
              setIsEncrypted={setIsEncrypted}
              setSongSignature={setSongSignature}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
              setIsWriteAnotherSongButtonClicked={setIsWriteAnotherSongButtonClicked}
            />

            <SongLyricsForm
              lyrics={lyrics}
              isSubmitted={isSubmitted}
              setLyrics={setLyrics}
              setIsSubmitted={setIsSubmitted}
              setIsEncrypted={setIsEncrypted}
              setSongSignature={setSongSignature}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
              setIsWriteAnotherSongButtonClicked={setIsWriteAnotherSongButtonClicked}
            />

            <GoToEncrypt title={title} lyrics={lyrics} isSubmitted={isSubmitted} setLyricsByLine={setLyricsByLine} setIsSubmitted={setIsSubmitted} />
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default WritePanel;
