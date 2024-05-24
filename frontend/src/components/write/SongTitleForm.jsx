import { Center, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Input } from '@chakra-ui/react';

function SongTitleForm({ title, isSubmitted, setTitle, setIsSubmitted, setIsEncrypted, setSongSignature, setIsChecked, setIsDeposited, setDepositReceipt }) {
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
    <Center>
      <FormControl isInvalid={!title && isSubmitted}>
        <FormLabel>
          <Heading fontSize={30}>Song Title</Heading>
        </FormLabel>
        <Input onChange={handleTitleChange} color="black" mt={5} size="md" w="500px" textAlign="left" p={8} bgColor="white" fontSize={22} />
        {title || !isSubmitted ? (
          <FormHelperText mb={0} fontSize={20} mt={10}>
            Enter your song title
          </FormHelperText>
        ) : (
          <FormErrorMessage as="b" mb={0} fontSize={20} mt={10} color={'tomato'}>
            You need to enter the song title!
          </FormErrorMessage>
        )}
      </FormControl>
    </Center>
  );
}

export default SongTitleForm;
