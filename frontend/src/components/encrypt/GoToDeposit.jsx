import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatSignature } from '../../utils/formatter';
import { useState } from 'react';

function GoToDeposit({ title, lyrics, isEncrypted, songSignature, setIsEncrypted, setSongSignature }) {
  const [formattedSongSignature, setFormattedSongSignature] = useState('');

  function getSignature() {
    try {
      const fullSignature = ethers.utils.hashMessage(title + '' + lyrics);
      const partialSignature = formatSignature(fullSignature);

      setFormattedSongSignature(partialSignature);
      setSongSignature(fullSignature);
      setIsEncrypted(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box mt={20} mb={40}>
      <Center>
        {isEncrypted ? (
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Text as="b" fontSize={20}>
              Your song signature in short version is:
            </Text>

            <Text w={460} as="mark" px="0.5em" py="0.5em" borderRadius="0.25em" textColor="#f2f2f2" bgColor="#60316e" mt={20} mb={40} fontSize={20}>
              {formattedSongSignature}
            </Text>

            <Text as="b" fontSize={20}>
              Now it's time to make a deposit!
            </Text>

            <Text as="b" mt={40} fontSize={20}>
              <Highlight query="Deposit" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
                Click on Deposit to continue...
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

export default GoToDeposit;
