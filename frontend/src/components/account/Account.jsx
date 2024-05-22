import ConnectButton from './ConnectButton';
import Current from './Current';
import Change from './Change';

import { Box, Center, Flex } from '@chakra-ui/react';

function Account({ account, accountFormatted, setAccount, setAccountFormatted, setSigner }) {
  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          {account ? (
            <Box>
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  <Current accountFormatted={accountFormatted} />

                  <Change />
                </Flex>
              </Center>
            </Box>
          ) : (
            <ConnectButton account={account} setAccount={setAccount} setAccountFormatted={setAccountFormatted} setSigner={setSigner} />
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Account;
