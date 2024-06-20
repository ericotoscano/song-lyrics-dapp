import { Box, Center, Flex, Link, Text } from '@chakra-ui/react';
import { formatAddress } from '../../utils/formatter';

function RegisterReceipt({ registerReceipt }) {
  return (
    <Box minWidth={820} mt={20}>
      <Center>
        <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
          <Text as="b" mb={30} fontSize="xx-large" color="#f1c550">
            Successfully Registered!
          </Text>
          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
            Songwriter
          </Text>
          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
            {formatAddress(registerReceipt[0])}
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
          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
            Block Number
          </Text>
          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
            {/* {registerReceipt[3]} */}
          </Text>

          <Box w={820} mt={20}>
            <Text as="b" fontSize={20}>
              See your register transaction details on{' '}
              <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${registerReceipt[4]}`} isExternal>
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
