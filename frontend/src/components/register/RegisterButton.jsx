import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

function RegisterButton({ signer, contractAddress, contractABI, title, songSignature, setIsRegistered, setRegisterReceipt, setIsListed, setRegisterHash }) {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const register = async () => {
    try {
      setIsRegisterLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      await SongRegister.connect(signer).register(title, songSignature, { value: 1000000000, gasLimit: 200000 });

      SongRegister.on('Registered', (songwriter, songTitle, songSignature, event) => {
        const data = [songwriter, songTitle, songSignature];

        setRegisterReceipt(data);
        setRegisterHash(event.transactionHash);
        setIsListed(false);
        setIsRegisterLoading(false);
        setIsRegistered(true);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box w={820} mb={40}>
      <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
        <Text mb={20} fontSize={20}>
          Now, it's time to register your song!
        </Text>
        <Box w={820} mt={20}>
          <Center>
            <Button isLoading={isRegisterLoading} loadingText="Registering..." fontSize={20} onClick={register}>
              Register Your Song
            </Button>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}

export default RegisterButton;
