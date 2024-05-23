import { Box, Center, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Textarea } from '@chakra-ui/react';

function LyricsForm({ lyrics, isSubmitted, setLyrics, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt }) {
  function handleLyricsChange(event) {
    setLyrics(event.target.value);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
    setIsChecked(false);
    setIsDeposited(false);
    setDepositReceipt([]);
  }

  return (
    <FormControl isInvalid={!lyrics && isSubmitted}>
      <FormLabel>
        <Heading fontSize={30}>Song Lyrics</Heading>
      </FormLabel>

      <Box>
        <Center>
          <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
            <Textarea onChange={handleLyricsChange} color="black" mt={5} size="md" w="500px" h="200px" textAlign="left" p={8} bgColor="white" fontSize={22} />
            {lyrics || !isSubmitted ? (
              <FormHelperText mb={0} fontSize={20} mt={10}>
                Enter your song lyrics
              </FormHelperText>
            ) : (
              <FormErrorMessage mb={0} fontSize={20} mt={10}>
                You need to enter the song lyrics!
              </FormErrorMessage>
            )}
          </Flex>
        </Center>
      </Box>
    </FormControl>
  );
}

export default LyricsForm;
