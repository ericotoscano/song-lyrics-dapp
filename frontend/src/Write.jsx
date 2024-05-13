import { Box, Button, Center, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Highlight, Input, TabPanel, Textarea, Text } from '@chakra-ui/react';

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
              <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                {title && lyrics && isSubmitted ? (
                  <Text as='b' m={40} fontSize={20}>
                    <Highlight query="Encrypt" styles={{ px: '0.5em', py: '0.5em', borderRadius: '10', bg: 'rgba(43, 211, 160, 0.87)', color: 'white' }}>
                      Click on Encrypt Tab to continue...
                    </Highlight>
                  </Text>
                ) : (
                  <Button fontSize={20} mt={40} mb={20} onClick={sendToEncrypt}>
                    Submit to Encrypt
                  </Button>
                )}
              </Flex>
            </Center>
          </Box>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default Write;
