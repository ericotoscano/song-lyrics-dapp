import { Box, Button, Center, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input, TabPanel, Text, Textarea } from '@chakra-ui/react';

function Write({ isSubmitted, setIsSubmitted, lyrics, title, setTitle, setLyrics, setLyricsByLine }) {
  function sendToEncrypt() {
    setLyricsByLine(lyrics.split(/\r?\n/));
    setIsSubmitted(true);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
    setIsSubmitted(false);
  }

  function handleLyricsChange(event) {
    setLyrics(event.target.value);
    setIsSubmitted(false);
  }

  return (
    <Box>
      <Center>
        <TabPanel>
          <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
            <FormControl isInvalid={!title && isSubmitted}>
              <FormLabel>
                <Heading fontSize={30}>Song Title</Heading>
              </FormLabel>
              <Box>
                <Center>
                  <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
                    <Input
                      onChange={handleTitleChange}
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
                    <FormErrorMessage fontSize={20} mt={10}>
                      You need to write the song title!
                    </FormErrorMessage>
                  </Flex>
                </Center>
              </Box>
            </FormControl>

            <FormControl isInvalid={!lyrics && isSubmitted}>
              <FormLabel>
                <Heading fontSize={30}>Song Lyrics</Heading>
              </FormLabel>
              <Box>
                <Center>
                  <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
                    <Textarea
                      onChange={handleLyricsChange}
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
                    <FormErrorMessage fontSize={20} mt={10}>
                      You need to write the song lyrics!
                    </FormErrorMessage>
                  </Flex>
                </Center>
              </Box>
            </FormControl>

            <Box>
              <Center>
                <Flex alignItems={'left'} justifyContent="center" flexDirection={'column'}>
                  <Button fontSize={20} mt={40} mb={40} onClick={sendToEncrypt}>
                    Submit to Encrypt
                  </Button>
                </Flex>
              </Center>
            </Box>
          </Flex>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Write;
