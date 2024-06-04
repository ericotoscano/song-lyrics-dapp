import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';

function MainHeadings() {
  return (
    <Box w="100vw" mb={40}>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Heading fontSize={50} mb={40}>
            Crypto Songs Lyrics
          </Heading>

          <Text as="cite" fontSize={30}>
            A cryptographic way to prove the authenticity of your songs lyrics ideas
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}

export default MainHeadings;
