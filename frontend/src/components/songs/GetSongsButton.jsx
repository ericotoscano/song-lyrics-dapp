import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function GetSongsButton({ signer, contractAddress, contractABI, isSongListLoading, isRegistered, setSongList, setIsListed, setIsRegistered, setIsSongListLoading }) {
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
  );
}

export default GetSongsButton;
