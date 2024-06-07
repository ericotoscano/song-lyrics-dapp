import CheckSongsHeading from './CheckSongsHeading';
import GetSongsButton from './GetSongsButton';

import { Box, Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';

function Songs({ account, signer, contract, contractAddress, contractABI, songList, isListed, isRegistered, setSongList, setIsListed, setIsRegistered }) {
  const [isSongListLoading, setIsSongListLoading] = useState(false);
  return (
    <Box>
      <Center>
        <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
          <CheckSongsHeading />
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
            setIsRegistered={setIsRegistered}
            setIsSongListLoading={setIsSongListLoading}
          />
        </Flex>
      </Center>
    </Box>
  );
}

export default Songs;
