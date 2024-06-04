import { Box, Button, Center, Flex, Link, Text } from '@chakra-ui/react';

function ContractStatus({ contractAddress, contractABI }) {
  return (
    <Box mt={10}>
      <Center>
        <Button bgColor="#884bf2" fontSize={20}>Check Contract Status</Button>
      </Center>
    </Box>
  );
}

export default ContractStatus;
