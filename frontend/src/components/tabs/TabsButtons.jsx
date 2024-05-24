import { Center, Flex, Tab, TabList } from '@chakra-ui/react';

function TabsButtons({ title, lyrics, isSubmitted, isEncrypted, songSignature, isDeposited }) {
  return (
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
  );
}

export default TabsButtons;
