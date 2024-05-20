import Write from './Write';
import Encrypt from './Encrypt';
import Deposit from './Deposit';
import Register from './Register';

import { Box, Center, Flex, Link, Tab, Tabs, TabList, TabPanels, Text } from '@chakra-ui/react';

function Tabulation({
  account,
  signer,
  title,
  lyrics,
  lyricsByLine,
  isSubmitted,
  isEncrypted,
  songSignature,
  isChecked,
  isDeposited,
  depositReceipt,
  isRegistered,
  registerReceipt,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsChecked,
  setIsDeposited,
  setDepositReceipt,
  setIsRegistered,
  setRegisterReceipt,
}) {
  return (
    <Box w="100vw">
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          {account ? (
            <Tabs mt={20}>
              <Box>
                <Center>
                  <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                    <TabList mb={20}>
                      <Tab marginInline={10}>Write</Tab>

                      {title && lyrics && isSubmitted ? (
                        <Tab marginInline={10}>Encrypt</Tab>
                      ) : (
                        <Tab isDisabled marginInline={10}>
                          Encrypt
                        </Tab>
                      )}

                      {title && lyrics && isEncrypted && songSignature ? (
                        <Tab marginInline={10}>Deposit</Tab>
                      ) : (
                        <Tab isDisabled marginInline={10}>
                          Deposit
                        </Tab>
                      )}

                      {title && lyrics && songSignature && isDeposited ? (
                        <Tab marginInline={10}>Register</Tab>
                      ) : (
                        <Tab isDisabled marginInline={10}>
                          Register
                        </Tab>
                      )}
                    </TabList>
                  </Flex>
                </Center>
              </Box>
              <Box>
                <Center>
                  <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                    <TabPanels>
                      <Write
                        title={title}
                        lyrics={lyrics}
                        isSubmitted={isSubmitted}
                        setTitle={setTitle}
                        setLyrics={setLyrics}
                        setLyricsByLine={setLyricsByLine}
                        setIsSubmitted={setIsSubmitted}
                        setIsEncrypted={setIsEncrypted}
                        setSongSignature={setSongSignature}
                        setIsChecked={setIsChecked}
                        setIsDeposited={setIsDeposited}
                        setDepositReceipt={setDepositReceipt}
                      />
                      <Encrypt
                        account={account}
                        title={title}
                        lyricsByLine={lyricsByLine}
                        isEncrypted={isEncrypted}
                        songSignature={songSignature}
                        setIsEncrypted={setIsEncrypted}
                        setSongSignature={setSongSignature}
                      />
                      <Deposit
                        account={account}
                        signer={signer}
                        isChecked={isChecked}
                        isDeposited={isDeposited}
                        depositReceipt={depositReceipt}
                        setIsChecked={setIsChecked}
                        setIsDeposited={setIsDeposited}
                        setDepositReceipt={setDepositReceipt}
                      />
                      <Register
                        account={account}
                        signer={signer}
                        songSignature={songSignature}
                        isRegistered={isRegistered}
                        registerReceipt={registerReceipt}
                        setIsRegistered={setIsRegistered}
                        setRegisterReceipt={setRegisterReceipt}
                      />
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
