import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';

function ErrorWarning({ errorReason, setIsRegisterButtonClicked }) {
  return (
    <Box w={850} mt={20} mb={40}>
      <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
        <Text as="b" fontSize={25} >
          An error ocurried while registering your song...
        </Text>
        <Text fontSize={25} color={'tomato'}>{errorReason}</Text>
      </Flex>

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

export default ErrorWarning;
