import ContractAddress from './ContractAddress';
import ContractStatus from './ContractStatus';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Center, Flex, OrderedList, List, ListItem, Text } from '@chakra-ui/react';

function Contract({ contractAddress, contractABI }) {
  return (
    <Box w="100vw" mb={40}>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <ContractAddress contractAddress={contractAddress} />
          <ContractStatus contractAddress={contractAddress} contractABI={contractABI} />
        </Flex>
      </Center>
    </Box>
  );
}

export default Contract;
