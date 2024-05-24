import RegisterHeading from './RegisterHeading';
import RegisterButton from './RegisterButton';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';

function RegisterPanel({ signer, contractAddress, contractABI, songSignature, isRegistered, registerReceipt, setIsRegistered, setRegisterReceipt }) {
  return (
    <Box>
      <Center>
        <TabPanel w={480}>
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <RegisterHeading />

            <RegisterButton
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              songSignature={songSignature}
              isRegistered={isRegistered}
              registerReceipt={registerReceipt}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
            />
          </Flex>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default RegisterPanel;
