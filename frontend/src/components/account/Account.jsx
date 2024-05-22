import Connect from './Connect';
import Current from './Current';
import Instruction from './Instruction';

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

                  <Instruction />
                </Flex>
              </Center>
            </Box>
          ) : (
            <Connect account={account} setAccount={setAccount} setAccountFormatted={setAccountFormatted} setSigner={setSigner} />
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Account;
