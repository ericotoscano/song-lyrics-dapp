import { Box, Center, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Input } from '@chakra-ui/react';

function TitleForm({ title, isSubmitted, setTitle, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt }) {
  function handleTitleChange(event) {
    setTitle(event.target.value);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
    setIsChecked(false);
    setIsDeposited(false);
    setDepositReceipt([]);
  }

  return (
    <FormControl isInvalid={!title && isSubmitted}>
      <FormLabel>
        <Heading fontSize={30}>Song Title</Heading>
      </FormLabel>

      <Box>
        <Center>
          <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
            <Input onChange={handleTitleChange} color="black" mt={5} size="md" w="500px" textAlign="left" p={8} bgColor="white" fontSize={22} />
            {title || !isSubmitted ? (
              <FormHelperText mb={0} fontSize={20} mt={10}>
                Enter your song title
              </FormHelperText>
            ) : (
              <FormErrorMessage mb={0} fontSize={20} mt={10}>
                You need to enter the song title!
              </FormErrorMessage>
            )}
          </Flex>
        </Center>
      </Box>
    </FormControl>
  );
}

export default TitleForm;
