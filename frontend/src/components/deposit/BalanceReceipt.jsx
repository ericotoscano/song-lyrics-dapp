import { Box, Center, Flex, Link, Text } from '@chakra-ui/react';

function BalanceReceipt({ currentCostInEther, currentCostInGwei, currentBalanceInGwei, currentBalanceInEther, depositReceipt, depositHash }) {
  return (
    <Box w={820}>
      <Center>
        {depositReceipt.length == 0 ? (
          <Box w={820} mt={20} mb={40}>
            <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
              <Text as="b" fontSize="x-large" color="#f1c550" mb={10}>
                Current Cost
              </Text>
              <Text as="em" fontSize="x-large" color="#f1c550" mb={20}>
                {currentCostInGwei} Gwei ({currentCostInEther} Ether)
              </Text>
              <Text as="b" fontSize="x-large" color="#f1c550" mb={10}>
                Your Balance
              </Text>
              <Text as="em" fontSize="x-large" color="#f1c550">
                {currentBalanceInGwei} Gwei ({currentBalanceInEther} Ether)
              </Text>
            </Flex>
          </Box>
        ) : (
          <Box w={820} mt={20} mb={40}>
            <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
              <Text as="b" mb={30} fontSize="xx-large" color="#f1c550">
                Successfully Deposited!
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Sender
              </Text>
              <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                {depositReceipt[0]}
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Value
              </Text>
              <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                {depositReceipt[1]}
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Current Balance
              </Text>
              <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                {depositReceipt[2]}
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Current Cost
              </Text>
              <Text as="em" fontSize="x-large" color="#f1c550">
                {depositReceipt[3]}
              </Text>

              <Box w={820} mt={40}>
                <Text as="b" fontSize={20}>
                  See your deposit transaction details on{' '}
                  <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${depositHash}`} isExternal>
                    Polygon Amoy Testnet Explorer
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default BalanceReceipt;
