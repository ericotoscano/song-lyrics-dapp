import { Box, Center, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Input } from '@chakra-ui/react';

function SongTitleForm({ title, isSubmitted, setTitle, setIsSubmitted, setIsEncrypted, setSongSignature, setIsRegistered, setRegisterReceipt }) {
  function handleTitleChange(event) {
    setTitle(event.target.value);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
    setIsRegistered(false);
    setRegisterReceipt([]);
  }

  return (
    <FormControl isInvalid={!title && isSubmitted} w={820}>
      <Box mb={40}>
        <Center>
          <Flex flexDirection={'column'}>
            <FormLabel>
              <Heading fontSize={30} ps={2}>
                Song Title
              </Heading>
            </FormLabel>
            <Input onChange={handleTitleChange} value={title} color="black" mt={5} size="md" w={820} textAlign="left" p={8} bgColor="white" fontSize={22} />
            {title || !isSubmitted ? (
              <FormHelperText fontSize={20} mt={10} ps={2}>
                Enter your song title
              </FormHelperText>
            ) : (
              <FormErrorMessage as="b" fontSize={20} mt={10} ps={2} color={'tomato'}>
                You need to enter the song title!
              </FormErrorMessage>
            )}
          </Flex>
        </Center>
      </Box>
    </FormControl>
  );
}

export default SongTitleForm;
