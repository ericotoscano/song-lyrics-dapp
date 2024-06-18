import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';

function PauseWarning({ setIsRegisterButtonClicked }) {
  return (
    <Box w={850} mt={20} mb={40}>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Text as="b" fontSize={25} color={'tomato'}>
            The Song Register is paused and is not accepting registries!
          </Text>
          <Text fontSize={25}>As soon as possible, you will be able to register your songs.</Text>
        </Flex>
      </Center>
      <Box>
        <Center>
          <Button fontSize={20} mt={20} mb={20} onClick={() => setIsRegisterButtonClicked(false)}>
            Try Again
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default PauseWarning;
