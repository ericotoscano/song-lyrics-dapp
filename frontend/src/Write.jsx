import { Box, Center, Flex, Heading, Input, TabPanel, Textarea } from '@chakra-ui/react';

function Write({ setTitle, setLyrics }) {
  return (
    <Box>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <TabPanel>
            <Heading fontSize={30}>Song Title</Heading>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              isRequired="true"
              placeholder="Type title here..."
              _placeholder={{ fontFamily: 'Inter' }}
              color="black"
              mt={2}
              size="md"
              w="500px"
              textAlign="left"
              p={6}
              bgColor="white"
              fontSize={22}
            />

            <Heading fontSize={30}>Song Lyrics</Heading>
            <Textarea
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Type lyrics here..."
              _placeholder={{ fontFamily: 'Inter' }}
              color="black"
              mt={2}
              size="md"
              w="500px"
              h="200px"
              textAlign="left"
              p={6}
              bgColor="white"
              fontSize={22}
            />
          </TabPanel>
        </Flex>
      </Center>
    </Box>
  );
}

export default Write;
