import { Box, Flex, Link, Text } from '@chakra-ui/react';

function Contract({ contractAddress }) {
  return (
    <Box mt={20}>
      <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
        <Text fontSize={25} mt={0}>
          Song Register Contract is deployed on{' '}
          <Link color={'#884bf2'} href={`https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos`} isExternal>
            Polygon Amoy Testnet
          </Link>
        </Text>

        <Text fontSize={25} mt={0}>
          See all contract details on{' '}
          <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/address/${contractAddress}`} isExternal>
            Block Explorer
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default Contract;
