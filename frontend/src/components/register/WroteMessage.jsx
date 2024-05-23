import { Box, Button, Center, Highlight, Text } from '@chakra-ui/react';

function WroteMessage({ title, lyrics, isSubmitted, setLyricsByLine, setIsSubmitted }) {
  function sendToEncrypt() {
    setLyricsByLine(lyrics.split(/\r?\n/));
    setIsSubmitted(true);
  }

  return (
    <Box>
      <Center>
        {title && lyrics && isSubmitted ? (
          <Text as="b" mt={40} mb={20} fontSize={20}>
            <Highlight query="Encrypt" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
              Click on Encrypt Tab to continue...
            </Highlight>
          </Text>
        ) : (
          <Button fontSize={20} mt={40} mb={20} onClick={sendToEncrypt}>
            Submit to Encrypt
          </Button>
        )}
      </Center>
    </Box>
  );
}

export default WroteMessage;
