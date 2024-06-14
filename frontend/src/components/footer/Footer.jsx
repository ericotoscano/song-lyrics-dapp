import { Box, Center, Flex, Link, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Text fontSize={25} mb={0}>
            Styled using{' '}
            <Link href="https://chakra-ui.com" isExternal>
              Chakra UI/React
            </Link>
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}

export default Footer;
