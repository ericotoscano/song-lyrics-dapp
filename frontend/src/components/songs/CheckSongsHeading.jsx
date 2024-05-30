import { Box, Center, Heading } from '@chakra-ui/react';

function CheckSongsHeading() {
  return (
    <Box w={820}>
      <Center>
        <Heading fontSize={35} mb={40}>
          Your Songs
        </Heading>
      </Center>
    </Box>
  );
}

export default CheckSongsHeading;
