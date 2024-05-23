import { Box, Center, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Text, Textarea } from '@chakra-ui/react';

function SongLyricsForm({ lyrics, isSubmitted, setLyrics, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt }) {
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
    <Center>
      <FormControl isInvalid={!lyrics && isSubmitted}>
        <FormLabel>
          <Heading fontSize={30}>Song Lyrics</Heading>
        </FormLabel>

        <Textarea onChange={handleLyricsChange} color="black" mt={5} size="md" w="500px" h="200px" textAlign="left" p={8} bgColor="white" fontSize={22} />
        {lyrics || !isSubmitted ? (
          <FormHelperText mb={0} fontSize={20} mt={10}>
            Enter your song lyrics
          </FormHelperText>
        ) : (
          <FormErrorMessage as="b" mb={0} fontSize={20} mt={10} color={'tomato'}>
            You need to enter the song lyrics!
          </FormErrorMessage>
        )}
      </FormControl>
    </Center>
  );
}

export default SongLyricsForm;
