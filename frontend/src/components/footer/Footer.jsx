import { Box, Center, Link, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box>
      <Center>
        <Text fontSize={25}>
          Built with{' '}
          <Link href="https://chakra-ui.com" isExternal>
            Chakra UI/React
          </Link>
        </Text>
      </Center>
    </Box>
  );
}

export default Footer;
