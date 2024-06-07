import { Box, Center, Flex, Link, Text } from '@chakra-ui/react';

function RegisterReceipt({ registerReceipt, registerHash }) {
  return (
    <Box w={820} mt={20}>
      <Center>
        <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
          <Text as="b" mb={30} fontSize="xx-large" color="#f1c550">
            Successfully Registered!
          </Text>
          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
            Songwriter
          </Text>
          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
            {registerReceipt[0]}
          </Text>
          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
            Song Title
          </Text>
          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
            {registerReceipt[1]}
          </Text>
          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
            Song Signature
          </Text>
          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
            {registerReceipt[2]}
          </Text>

          <Box w={820} mt={20}>
            <Text as="b" fontSize={20}>
              See your register transaction details on{' '}
              <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${registerHash}`} isExternal>
                Polygon Amoy Testnet Explorer
              </Link>
            </Text>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}

export default RegisterReceipt;
