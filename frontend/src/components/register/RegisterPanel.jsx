import RegisterHeading from './RegisterHeading';
import RegisterButton from './RegisterButton';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';

function RegisterPanel({ signer, contractAddress, contractABI, title, songSignature, isRegistered, registerReceipt, setIsRegistered, setRegisterReceipt }) {
  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            <RegisterHeading />

            <RegisterButton
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              title={title}
              songSignature={songSignature}
              isRegistered={isRegistered}
              registerReceipt={registerReceipt}
              setIsRegistered={setIsRegistered}
              setRegisterReceipt={setRegisterReceipt}
            />
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default RegisterPanel;
