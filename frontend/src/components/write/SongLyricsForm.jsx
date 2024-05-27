import { Center, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Textarea, Box } from '@chakra-ui/react';

function SongLyricsForm({ lyrics, isSubmitted, setLyrics, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt, setIsRegistered, setRegisterReceipt }) {
  function handleLyricsChange(event) {
    setLyrics(event.target.value);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
    setIsChecked(false);
    setIsDeposited(false);
    setDepositReceipt([]);
    setIsRegistered(false);
    setRegisterReceipt([]);
  }

  return (
    <FormControl isInvalid={!lyrics && isSubmitted} w={820}>
      <Box mb={20}>
        <Center>
          <Flex flexDirection={'column'}>
            <FormLabel>
              <Heading fontSize={30} ps={2}>
                Song Lyrics
              </Heading>
            </FormLabel>

            <Textarea onChange={handleLyricsChange} color="black" mt={5} size="md" w={820} h={200} textAlign="left" p={8} bgColor="white" fontSize={22} />
            {lyrics || !isSubmitted ? (
              <FormHelperText fontSize={20} mt={10} ps={2}>
                Enter your song lyrics
              </FormHelperText>
            ) : (
              <FormErrorMessage as="b" fontSize={20} mt={10} ps={2} color={'tomato'}>
                You need to enter the song lyrics!
              </FormErrorMessage>
            )}
          </Flex>
        </Center>
      </Box>
    </FormControl>
  );
}

export default SongLyricsForm;
