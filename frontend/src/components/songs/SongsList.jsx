import { Box, Center, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Heading, Highlight, Input, Link, Text } from '@chakra-ui/react';

function SongsList({ songList }) {
  return (
    <Box w={820}>
      <Center>
        {songList.length == 0 ? (
          <Box w={820} mb={40}>
            <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
              <Text as="b" mb={40} mt={20} fontSize={20} color={'tomato'}>
                You have no songs registered yet!
              </Text>
              <Box w={820}>
                <Center>
                  <Text as="b" mt={20} mb={20} fontSize={20}>
                    <Highlight
                      query="Register a Song"
                      styles={{ px: '0.75em', py: '0.75em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}
                    >
                      Go to Register a Song
                    </Highlight>
                  </Text>
                </Center>
              </Box>
            </Flex>
          </Box>
        ) : (
          <Box w={820} mt={20} mb={40}>
            <Center>
              <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                <FormControl>
                  <Box mb={40}>
                    <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                      <FormLabel>
                        <Heading fontSize={30} ps={2}>
                          Search By Title
                        </Heading>
                      </FormLabel>
                      <Input color="black" mt={5} size="md" textAlign="left" p={8} bgColor="white" fontSize={22} />
                    </Flex>
                  </Box>
                </FormControl>

                {songList.map((song, index) => (
                  <li key={index}>
                    <Box mb={40} w={820}>
                      <Center>
                        <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                          <Text as="b" mb={30} fontSize="xx-large" color="#f1c550">
                            Song {index + 1}
                          </Text>

                          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                            Title
                          </Text>
                          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                            {song[0]}
                            {song.songTitle}
                          </Text>
                          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                            Signature
                          </Text>
                          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                            {song[1]}
                          </Text>
                          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                            Block Number
                          </Text>
                          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                            {song.blockNumber}
                          </Text>
                          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                            See transaction details on{' '}
                            <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${song.transactionHash}`} isExternal>
                              Polygon Amoy Testnet Explorer
                            </Link>
                            {song.signature}
                          </Text>
                          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                            Block Number
                          </Text>
                          <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                            {song.blockNumber}
                          </Text>
                          <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                            See transaction details on{' '}
                            <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${song.transactionHash}`} isExternal>
                              Polygon Amoy Testnet Explorer
                            </Link>
                          </Text>
                        </Flex>
                      </Center>
                    </Box>
                  </li>
                ))}
              </Flex>
            </Center>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default SongsList;
