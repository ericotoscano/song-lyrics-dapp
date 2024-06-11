import { Box, Button, Center } from '@chakra-ui/react';

function CloseReceiptButton({ setTitle, setLyrics, setLyricsByLine, setIsSubmitted, setIsEncrypted, setSongSignature, setIsRegistered, setIsRegisterButtonClicked, setIsCheckButtonClicked }) {
  const restartAll = () => {
    setTitle('');
    setLyrics('');
    setLyricsByLine([]);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
    setIsRegistered(false);
    setIsRegisterButtonClicked(false);
    setIsCheckButtonClicked(false);
  };

  return (
    <Box w={820} mt={40} mb={20}>
      <Center>
        <Button fontSize={20} onClick={restartAll}>
          Close Receipt
        </Button>
      </Center>
    </Box>
  );
}

export default CloseReceiptButton;
