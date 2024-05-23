import SongTitleForm from './SongTitleForm';
import SongLyricsForm from './SongLyricsForm';
import GoToEncrypt from './GoToEncrypt';

import { Center, TabPanel } from '@chakra-ui/react';

function WriteTab({ title, lyrics, isSubmitted, setTitle, setLyrics, setLyricsByLine, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt }) {
  return (
    <Center>
      <TabPanel>
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
        />

        <GoToEncrypt title={title} lyrics={lyrics} isSubmitted={isSubmitted} setLyricsByLine={setLyricsByLine} setIsSubmitted={setIsSubmitted} />
      </TabPanel>
    </Center>
  );
}

export default WriteTab;
