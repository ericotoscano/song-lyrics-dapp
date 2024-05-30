import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';

function GoToEncrypt({ title, lyrics, isSubmitted, setLyricsByLine, setIsSubmitted }) {
  function sendToEncrypt() {
    setLyricsByLine(lyrics.split(/\r?\n/));
    setIsSubmitted(true);
  }

  return (
    <Box w={820} mt={20} mb={40}>
      <Center>
        {title && lyrics && isSubmitted ? (
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Text as="b" fontSize={25} >
              Now you can create the song signature!
            </Text>
            <Text as="b" mt={40} mb={20} fontSize={20}>
              <Highlight query="Encrypt" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
                Go to Encrypt to continue...
              </Highlight>
            </Text>
          </Flex>
        ) : (
          <Button fontSize={20} onClick={sendToEncrypt}>
            Submit to Encrypt
          </Button>
        )}
      </Center>
    </Box>
  );
}

export default GoToEncrypt;
