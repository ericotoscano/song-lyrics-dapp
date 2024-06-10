import { Box, Flex, Highlight, Text } from '@chakra-ui/react';

function AnotherSongMessage() {
  return (
    <Box w={820} mt={20} mb={20}>
      <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
        <Text as="b" fontSize={25} mt={20}>
          Let's write another song!
        </Text>
        <Text as="b" mt={40} mb={40} fontSize={20}>
          <Highlight query="Write" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
            Go to Write to continue...
          </Highlight>
        </Text>
      </Flex>
    </Box>
  );
}

export default AnotherSongMessage;
