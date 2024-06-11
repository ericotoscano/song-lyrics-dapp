import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function GoToRegister({ title, lyrics, isEncrypted, songSignature, setIsEncrypted, setSongSignature }) {
  function getSignature() {
    try {
      const signature = ethers.hashMessage(title + '' + lyrics);

      setSongSignature(signature);
      setIsEncrypted(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box w={820} mt={40} mb={40}>
      <Center>
        {isEncrypted ? (
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Text as="b" fontSize={25}>
              Your song signature is:
            </Text>

            <Text as="mark" px="0.5em" py="0.5em" borderRadius="0.25em" textColor="#f1c550" bgColor="#60316e" mt={20} mb={40} fontSize={20}>
              {songSignature}
            </Text>

            <Text as="b" fontSize={25}>
              Now it's time to register your song!
            </Text>

            <Text as="b" mt={40} mb={20} fontSize={20}>
              <Highlight query="Register" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
                Go to Register to continue...
              </Highlight>
            </Text>
          </Flex>
        ) : (
          <Button fontSize={20} onClick={getSignature}>
            Create Song Signature
          </Button>
        )}
      </Center>
    </Box>
  );
}

export default GoToRegister;
