import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { ErrorDecoder } from 'ethers-decode-error';
import { errorsMapper } from '../../utils/errorsMapper';

function RegisterButton({
  account,
  signer,
  contractAddress,
  contractABI,
  title,
  songSignature,
  isRegisterLoading,
  setIsRegistered,
  setRegisterReceipt,
  setIsListed,
  setIsRegisterLoading,
  setErrorReason,
}) {
  const errorDecoder = ErrorDecoder.create([contractABI]);
  const register = async () => {
    try {
      setIsRegisterLoading(true);
      const songRegister = new ethers.Contract(contractAddress, contractABI, signer);

      const isPaused = await songRegister.isPaused();

      if (!isPaused) {
        const currentCost = await songRegister.cost();

        const tx = await songRegister.register(title, songSignature, { value: parseInt(currentCost), gasLimit: 200000 });

        await tx.wait();

        const data = [account, title, songSignature];
        setRegisterReceipt(data);
        setIsListed(false);
        setIsRegisterLoading(false);
        setIsRegistered(true);
      }
    } catch (error) {
      const decodedError = await errorDecoder.decode(error);
      const reason = errorsMapper(decodedError);

      console.log(reason);

      setErrorReason(reason);
      setIsRegisterLoading(false);
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
