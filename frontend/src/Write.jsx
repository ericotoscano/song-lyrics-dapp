import { Box, Button, Center, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input, TabPanel, Textarea } from '@chakra-ui/react';

function Write({ isSubmitted, setIsSubmitted, setIsEncrypted, setSongSignature, lyrics, title, setTitle, setLyrics, setLyricsByLine }) {
  function sendToEncrypt() {
    setLyricsByLine(lyrics.split(/\r?\n/));
    setIsSubmitted(true);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
  }

  function handleLyricsChange(event) {
    setLyrics(event.target.value);
    setIsSubmitted(false);
    setIsEncrypted(false);
    setSongSignature('');
  }

  return (
    <Box>
      <Center>
        <TabPanel>
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
              <Button fontSize={20} mt={40} mb={40} onClick={sendToEncrypt}>
                Submit to Encrypt
              </Button>
            </Center>
          </Box>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Write;
