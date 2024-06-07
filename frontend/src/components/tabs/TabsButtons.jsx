import { Box, Center, Flex, Tab, TabList } from '@chakra-ui/react';

function TabsButtons({ title, lyrics, songSignature, isSubmitted, isEncrypted, isRegistered, isPaused }) {
  return (
    <TabList>
      <Box minWidth={850}>
        <Center>
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'row'}>
            {!isRegistered && !isPaused ? (
              <Tab minWidth={270} marginInline={10}>
                Write
              </Tab>
            ) : (
              <Tab minWidth={270} isDisabled marginInline={10}>
                Write
              </Tab>
            )}

            {!isRegistered && !isPaused && title && lyrics && isSubmitted ? (
              <Tab minWidth={270} marginInline={10}>
                Encrypt
              </Tab>
            ) : (
              <Tab minWidth={270} isDisabled marginInline={10}>
                Encrypt
              </Tab>
            )}

            {!isRegistered && !isPaused && title && lyrics && isEncrypted && songSignature ? (
              <Tab minWidth={270} marginInline={10}>
                Register
              </Tab>
            ) : (
              <Tab minWidth={270} isDisabled marginInline={10}>
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
