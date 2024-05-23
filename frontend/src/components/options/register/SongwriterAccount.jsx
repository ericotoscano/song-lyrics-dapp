import { Box, Heading, Text } from '@chakra-ui/react';

function SongwriterAccount({ accountFormatted }) {
  return (
    <Box>
      <Heading size="xs">Songwriter Account</Heading>
      <Text fontSize="x-large">{accountFormatted}</Text>
    </Box>
  );
}

export default SongwriterAccount;
