import WriteTab from './WriteTab';
import EncryptTab from './EncryptTab';
import DepositTab from './DepositTab';
import RegisterTab from './RegisterTab';

import { Box, Center, Flex, Tab, Tabs, TabList, TabPanels } from '@chakra-ui/react';

function Register({
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
              <Center>
                <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
                  <TabList mb={20}>
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
                      </Flex>
                    </Center>
                  </TabList>
                </Flex>
              </Center>

              <Box>
                <Center>
                  <TabPanels>
                    <WriteTab
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
                    <EncryptTab
                      accountFormatted={accountFormatted}
                      title={title}
                      lyricsByLine={lyricsByLine}
                      isEncrypted={isEncrypted}
                      songSignature={songSignature}
                      setIsEncrypted={setIsEncrypted}
                      setSongSignature={setSongSignature}
                    />
                    <DepositTab
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
                    <RegisterTab
                      account={account}
                      accountFormatted={accountFormatted}
                      signer={signer}
                      songSignature={songSignature}
                      isRegistered={isRegistered}
                      registerReceipt={registerReceipt}
                      setIsRegistered={setIsRegistered}
                      setRegisterReceipt={setRegisterReceipt}
                    />
                  </TabPanels>
                </Center>
              </Box>
            </Tabs>
          ) : null}
        </Flex>
      </Center>
    </Box>
  );
}

export default Register;
