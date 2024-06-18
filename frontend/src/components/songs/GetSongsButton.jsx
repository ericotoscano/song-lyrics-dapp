import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function GetSongsButton({ account, signer, contractAddress, contractABI, isSongListLoading, setSongList, setIsListed, setIsSongListLoading }) {
  const songRegister = new ethers.Contract(contractAddress, contractABI, signer);

  const getSongs = async () => {
    try {
      setIsSongListLoading(true);

      const songs = [];

      const filter = songRegister.filters.Registered(account);
      const events = await songRegister.queryFilter(filter);

      events.forEach((eventLog) => {
        const song = { blockNumber: eventLog.blockNumber, songTitle: eventLog.args[1], signature: eventLog.args[2], transactionHash: eventLog.transactionHash };

        songs.push(song);
      });

      //const songs = await SongRegister.connect(signer).getSongs();

      setSongList(songs);
      setIsListed(true);
      setIsSongListLoading(false);
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
