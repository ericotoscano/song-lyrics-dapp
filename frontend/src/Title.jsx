import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';

function Title() {
  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Heading mb={30} fontSize={35}>
            Crypto Songs Lyrics
          </Heading>

          <Text mb={40} fontSize={25} as="cite">
            A cryptographic way to prove the authenticity of your songs lyrics ideas
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}

export default Title;
