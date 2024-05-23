import TitleForm from './TitleForm';
import LyricsForm from './LyricsForm';
import WroteMessage from './WroteMessage';

import { Box, Center, TabPanel } from '@chakra-ui/react';

function WriteTab({ title, lyrics, isSubmitted, setTitle, setLyrics, setLyricsByLine, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt }) {
  return (
    <Box>
      <Center>
        <TabPanel>
          <TitleForm
            title={title}
            isSubmitted={isSubmitted}
            setTitle={setTitle}
            setIsSubmitted={setIsSubmitted}
            setIsEncrypted={setIsEncrypted}
            setSongSignature={setSongSignature}
            setIsChecked={setIsChecked}
            setIsDeposited={setIsDeposited}
            setDepositReceipt={setDepositReceipt}
          />

          <LyricsForm
            lyrics={lyrics}
            isSubmitted={isSubmitted}
            setLyrics={setLyrics}
            setIsSubmitted={setIsSubmitted}
            setIsEncrypted={setIsEncrypted}
            setSongSignature={setSongSignature}
            setIsChecked={setIsChecked}
            setIsDeposited={setIsDeposited}
            setDepositReceipt={setDepositReceipt}
          />

          <WroteMessage title={title} lyrics={lyrics} isSubmitted={isSubmitted} setLyricsByLine={setLyricsByLine} setIsSubmitted={setIsSubmitted} />
        </TabPanel>
      </Center>
    </Box>
  );
}

export default WriteTab;
