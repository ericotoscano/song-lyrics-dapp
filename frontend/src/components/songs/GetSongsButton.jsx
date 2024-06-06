import { Box, Button, Center, Flex, Highlight, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function GetSongsButton({ signer, contractAddress, contractABI, songList, isSongListLoading, isListed, isRegistered, setSongList, setIsListed, setIsRegistered, setIsSongListLoading }) {
  const getSongs = async () => {
    try {
      setIsSongListLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      const songs = await SongRegister.connect(signer).getSongs();

      setSongList(songs);
      setIsListed(true);
      setIsSongListLoading(false);

      if (isRegistered) {
        setIsRegistered(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box w={820}>
      <Center>
        {isListed ? (
          songList.length == 0 ? (
            <Box w={820} mb={40}>
              <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                <Text as="b" mb={40} fontSize={20} color={'tomato'}>
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
                              {song.title}
                            </Text>
                            <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                              Signature
                            </Text>
                            <Text as="em" fontSize="x-large" color="#f1c550">
                              {song.signature}
                            </Text>
                          </Flex>
                        </Center>
                      </Box>
                    </li>
                  ))}
                </Flex>
              </Center>
            </Box>
          )
        ) : (
          <Box w={820}>
            <Center>
              <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                <Text fontSize={20} mb={20} align={'center'}>
                  Click on the button bellow to get a list of all your registered songs.
                </Text>

                <Button isLoading={isSongListLoading} loadingText="Getting Your Songs..." fontSize={20} mt={20} mb={40} onClick={getSongs}>
                  Get Songs
                </Button>
              </Flex>
            </Center>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default GetSongsButton;
