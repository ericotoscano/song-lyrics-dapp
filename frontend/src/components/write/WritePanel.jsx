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
  setIsChecked,
  setIsDeposited,
  setDepositReceipt,
  setIsRegistered,
  setRegisterReceipt,
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
              setIsChecked={setIsChecked}
              setIsDeposited={setIsDeposited}
              setDepositReceipt={setDepositReceipt}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
            />

            <SongLyricsForm
              lyrics={lyrics}
              isSubmitted={isSubmitted}
              setLyrics={setLyrics}
              setIsSubmitted={setIsSubmitted}
              setIsEncrypted={setIsEncrypted}
              setSongSignature={setSongSignature}
              setIsChecked={setIsChecked}
              setIsDeposited={setIsDeposited}
              setDepositReceipt={setDepositReceipt}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
            />

            <GoToEncrypt title={title} lyrics={lyrics} isSubmitted={isSubmitted} setLyricsByLine={setLyricsByLine} setIsSubmitted={setIsSubmitted} />
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default WritePanel;
