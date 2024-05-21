import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';

function Options() {
  const deposit = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBalance = async () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box>
      <Center>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
          <Heading fontSize={30} mb={20}>
            What would you like to do?
          </Heading>

          <Box>
            <Center>
              <Button fontSize={20} mt={20} mb={20} marginInline={15}>
                Check Your Songs
              </Button>
              <Button fontSize={20} mt={20} mb={20} marginInline={15}>
                Register a Song
              </Button>
            </Center>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}

export default Options;

{
  /* <Tabulation
  account={account}
  accountFormatted={accountFormatted}
  signer={signer}
  title={title}
  lyrics={lyrics}
  lyricsByLine={lyricsByLine}
  isSubmitted={isSubmitted}
  isEncrypted={isEncrypted}
  songSignature={songSignature}
  isChecked={isChecked}
  isDeposited={isDeposited}
  depositReceipt={depositReceipt}
  isRegistered={isRegistered}
  registerReceipt={registerReceipt}
  setTitle={setTitle}
  setLyrics={setLyrics}
  setLyricsByLine={setLyricsByLine}
  setIsSubmitted={setIsSubmitted}
  setIsEncrypted={setIsEncrypted}
  setSongSignature={setSongSignature}
  setIsChecked={setIsChecked}
  setIsDeposited={setIsDeposited}
  setDepositReceipt={setDepositReceipt}
  setIsRegistered={setIsRegistered}
  setRegisterReceipt={setRegisterReceipt}
/>; */
}
