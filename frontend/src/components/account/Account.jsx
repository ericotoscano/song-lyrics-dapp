import ConnectButton from './ConnectButton';
import CurrentAccount from './CurrentAccount';
import ChangeAccount from './ChangeAccount';

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
                  <CurrentAccount accountFormatted={accountFormatted} />
                  <ChangeAccount />
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
