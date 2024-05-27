import { Box, Center, Flex, Tab, TabList } from '@chakra-ui/react';

function TabsButtons({ title, lyrics, isSubmitted, isEncrypted, songSignature, isDeposited }) {
  return (
    <TabList>
      <Box>
        <Center>
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'row'}>
            <Tab w={200} marginInline={10}>
              Write
            </Tab>

            {title && lyrics && isSubmitted ? (
              <Tab w={200} marginInline={10}>
                Encrypt
              </Tab>
            ) : (
              <Tab w={200} isDisabled marginInline={10}>
                Encrypt
              </Tab>
            )}

            {title && lyrics && isEncrypted && songSignature ? (
              <Tab w={200} marginInline={10}>
                Deposit
              </Tab>
            ) : (
              <Tab w={200} isDisabled marginInline={10}>
                Deposit
              </Tab>
            )}

            {title && lyrics && songSignature && isDeposited ? (
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
