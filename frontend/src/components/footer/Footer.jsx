import { Box, Center, Flex, Link, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Text fontSize={25} mb={0}>
            Built with{' '}
            <Link href="https://chakra-ui.com" isExternal>
              Chakra UI/React
            </Link>
          </Text>
          <Text fontSize={25} >
            Developed for{' '}
            <Link color={'orange'} href="https://metamask.io/" isExternal>
              MetaMask
            </Link>
          </Text>
        </Flex>
      </Center>
    </Box>
  );
}

export default Footer;
