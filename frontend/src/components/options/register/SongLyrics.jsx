import { Box, Heading, Text } from '@chakra-ui/react';

function SongLyrics({ lyricsByLine }) {
  return (
    <Box>
      <Heading size="xs">Song Lyrics</Heading>
      <Text fontSize="x-large">
        {lyricsByLine.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </Text>
    </Box>
  );
}

export default SongLyrics;
