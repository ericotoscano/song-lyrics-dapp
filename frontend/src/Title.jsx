import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';

function Title() {
  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Heading fontSize={50} mb={40}>
            Crypto Songs Lyrics
          </Heading>

          <Text as="cite" fontSize={25} mb={20}>
            A cryptographic way to prove the authenticity of your songs lyrics ideas
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}

export default Title;
