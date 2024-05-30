import { Box, Center, Flex, Tab, TabList } from '@chakra-ui/react';

function TabsButtons({ title, lyrics, songSignature, isSubmitted, isEncrypted, isDeposited, isRegistered }) {
  return (
    <TabList>
      <Box>
        <Center>
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'row'}>
            {!isRegistered ? (
              <Tab w={200} marginInline={10}>
                Write
              </Tab>
            ) : (
              <Tab w={200} isDisabled marginInline={10}>
                Write
              </Tab>
            )}

            {!isRegistered && title && lyrics && isSubmitted ? (
              <Tab w={200} marginInline={10}>
                Encrypt
              </Tab>
            ) : (
              <Tab w={200} isDisabled marginInline={10}>
                Encrypt
              </Tab>
            )}

            {!isRegistered && title && lyrics && isEncrypted && songSignature ? (
              <Tab w={200} marginInline={10}>
                Deposit
              </Tab>
            ) : (
              <Tab w={200} isDisabled marginInline={10}>
                Deposit
              </Tab>
            )}

            {!isRegistered && title && lyrics && songSignature && isDeposited ? (
              <Tab w={200} marginInline={10}>
                Register
              </Tab>
            ) : (
              <Tab w={200} isDisabled marginInline={10}>
                Register
              </Tab>
            )}
          </Flex>
        </Center>
      </Box>
    </TabList>
  );
}

export default TabsButtons;
