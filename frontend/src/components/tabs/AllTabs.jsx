import TabsButtons from './TabsButtons';
import WritePanel from './write/WritePanel';
import EncryptPanel from './encrypt/EncryptPanel';
import DepositPanel from './deposit/DepositPanel';
import RegisterPanel from './register/RegisterPanel';

import { Box, Center, Tabs, TabPanels } from '@chakra-ui/react';

function AllTabs({
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
    <Box>
      <Center>
        <Tabs mt={20}>
          <Center>
            <TabsButtons title={title} lyrics={lyrics} isSubmitted={isSubmitted} isEncrypted={isEncrypted} songSignature={songSignature} isDeposited={isDeposited} />
          </Center>

          <Box>
            <Center>
              <TabPanels>
                <WritePanel
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
                <EncryptPanel
                  accountFormatted={accountFormatted}
                  title={title}
                  lyricsByLine={lyricsByLine}
                  isEncrypted={isEncrypted}
                  songSignature={songSignature}
                  setIsEncrypted={setIsEncrypted}
                  setSongSignature={setSongSignature}
                />
                <DepositPanel
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
                <RegisterPanel
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
      </Center>
    </Box>
  );
}

export default AllTabs;
