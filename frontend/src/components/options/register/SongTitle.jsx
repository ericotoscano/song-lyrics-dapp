import { Box, Heading, Text } from '@chakra-ui/react';

function SongTitle({ title }) {
  return (
    <Box>
      <Heading size="xs">Song Title</Heading>
      <Text fontSize="x-large">{title}</Text>
    </Box>
  );
}

export default SongTitle;
