import Write from './Write';
import Encrypt from './Encrypt';
import Deposit from './Deposit';
import Register from './Register';
import Songs from './Songs';

import { Box, Center, Flex, Link, Tab, Tabs, TabList, TabPanels, Text } from '@chakra-ui/react';

function Tabulation({
  account,
  accountFormatted,
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
                      <Box>
                        <Center>
                          <Flex alignItems={'center'} justifyContent="center" flexDirection={'row'}>
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

                            {title && lyrics && songSignature && isDeposited && isRegistered ? (
                              <Tab marginInline={10}>Register</Tab>
                            ) : (
                              <Tab isDisabled marginInline={10}>
                                Songs
                              </Tab>
                            )}
                          </Flex>
                        </Center>
                      </Box>
                    </TabList>
                  </Flex>
                </Center>
              </Box>

              <Box>
                <Center>
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
                      accountFormatted={accountFormatted}
                      title={title}
                      lyricsByLine={lyricsByLine}
                      isEncrypted={isEncrypted}
                      songSignature={songSignature}
                      setIsEncrypted={setIsEncrypted}
                      setSongSignature={setSongSignature}
                    />
                    <Deposit
                      account={account}
                      accountFormatted={accountFormatted}
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
                      accountFormatted={accountFormatted}
                      signer={signer}
                      songSignature={songSignature}
                      isRegistered={isRegistered}
                      registerReceipt={registerReceipt}
                      setIsRegistered={setIsRegistered}
                      setRegisterReceipt={setRegisterReceipt}
                    />
                    <Songs />
                  </TabPanels>
                </Center>
              </Box>
            </Tabs>
          ) : (
            <Box>
              <Center>
                <Text fontSize={25}>
                  Built with{' '}
                  <Link href="https://chakra-ui.com" isExternal>
                    Chakra UI/React
                  </Link>
                </Text>
              </Center>
            </Box>
          )}
        </Flex>
      </Center>
    </Box>
  );
}

export default Tabulation;
