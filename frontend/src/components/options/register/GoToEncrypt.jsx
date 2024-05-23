import { Box, Button, Center, Highlight, Text } from '@chakra-ui/react';

function GoToEncrypt({ title, lyrics, isSubmitted, setLyricsByLine, setIsSubmitted }) {
  function sendToEncrypt() {
    setLyricsByLine(lyrics.split(/\r?\n/));
    setIsSubmitted(true);
  }

  return (
    <Box mt={40} mb={40}>
      <Center>
        {title && lyrics && isSubmitted ? (
          <Text as="b" fontSize={20} color={'tomato'}>
            <Highlight query="Encrypt" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
              Click on Encrypt to continue...
            </Highlight>
          </Text>
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
