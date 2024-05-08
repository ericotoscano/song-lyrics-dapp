import Write from './Write';
import Encrypt from './Encrypt';
import Deposit from './Deposit';

import { Box, Center, Flex, Link, Tab, Tabs, TabList, TabPanels, Text } from '@chakra-ui/react';

function Tabulation({ account, signer, title, lyrics, songSignature, depositReceipt, setTitle, setLyrics, setSongSignature, setDepositReceipt }) {
  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          {account ? (
            <Tabs mt={20}>
              <TabList mb={20}>
                <Tab marginInline={10}>Write</Tab>

                {title && lyrics ? (
                  <Tab marginInline={10}>Encrypt</Tab>
                ) : (
                  <Tab isDisabled marginInline={10}>
                    Encrypt
                  </Tab>
                )}

                {title && lyrics && songSignature ? (
                  <Tab marginInline={10}>Deposit</Tab>
                ) : (
                  <Tab isDisabled marginInline={10}>
                    Deposit
                  </Tab>
                )}

                {title && lyrics && songSignature && depositReceipt ? (
                  <Tab marginInline={10}>Register</Tab>
                ) : (
                  <Tab isDisabled marginInline={10}>
                    Register
                  </Tab>
                )}
              </TabList>
              <Box>
                <Center>
                  <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                    <TabPanels>
                      <Write setTitle={setTitle} setLyrics={setLyrics} />
                      <Encrypt account={account} title={title} lyrics={lyrics} songSignature={songSignature} setSongSignature={setSongSignature} />
                      <Deposit account={account} signer={signer} songSignature={songSignature} depositReceipt={depositReceipt} setDepositReceipt={setDepositReceipt} />
                    </TabPanels>
                  </Flex>
                </Center>
              </Box>
            </Tabs>
          ) : (
            <Text fontSize={25}>
              Built with{' '}
              <Link href="https://chakra-ui.com" isExternal>
                Chakra UI/React
              </Link>
            </Text>
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Tabulation;
