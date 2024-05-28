import CheckSongsHeading from './CheckSongsHeading';
import SongsListHeading from './SongsListHeading';
import GetSongsButton from './GetSongsButton';

import { Box, Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function Songs({ account, signer, contractAddress, contractABI, songList, isListed, isRegistered, setSongList, setIsListed }) {
  const [isSongListLoading, setIsSongListLoading] = useState(false);
  return (
    <Box>
      <Center>
        <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
          <CheckSongsHeading />
          <SongsListHeading />
          <GetSongsButton
            account={account}
            signer={signer}
            contractAddress={contractAddress}
            contractABI={contractABI}
            songList={songList}
            isListed={isListed}
            isRegistered={isRegistered}
            isSongListLoading={isSongListLoading}
            setSongList={setSongList}
            setIsListed={setIsListed}
            setIsSongListLoading={setIsSongListLoading}
          />
        </Flex>
      </Center>
    </Box>
  );
}

export default Songs;
