import { Box, Button, Center } from '@chakra-ui/react';

function CloseReceiptButton({
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsRegistered,
  setIsRegisterButtonClicked,
  setIsCheckButtonClicked,
  setTabIndex,
}) {
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
    setTabIndex(0);
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
