import { Box, Button, Center } from '@chakra-ui/react';

function WriteAnotherSongButton({ setTitle, setLyrics, setLyricsByLine, setIsSubmitted, setIsEncrypted, setIsChecked, setIsDeposited, setDepositReceipt, setIsWriteAnotherSongButtonClicked }) {
  const restartAll = () => {
    setTitle('');
    setLyrics('');
    setLyricsByLine([]);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setIsChecked(false);
    setIsDeposited(false);
    setDepositReceipt([]);
    setIsWriteAnotherSongButtonClicked(true);
  };

  return (
    <Box w={820} mt={40} mb={20}>
      <Center>
        <Button fontSize={20} onClick={restartAll}>
          Write Another Song
        </Button>
      </Center>
    </Box>
  );
}

export default WriteAnotherSongButton;
