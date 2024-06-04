import { Box, Center, Heading } from '@chakra-ui/react';

function Question() {
  return (
    <Box minWidth={850} mt={10}>
      <Center>
        <Heading fontSize={35} >
          What would you like to do?
        </Heading>
      </Center>
    </Box>
  );
}

export default Question;
