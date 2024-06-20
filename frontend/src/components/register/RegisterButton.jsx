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
  const songRegister = new ethers.Contract(contractAddress, contractABI, signer);

  const errorDecoder = ErrorDecoder.create([contractABI]);

  const register = async () => {
    try {
      setIsRegisterLoading(true);
      const isPaused = await songRegister.isPaused();

      if (!isPaused) {
        const currentCost = await songRegister.cost();

        const tx = await songRegister.connect(signer).register(title, songSignature, { value: parseInt(currentCost), gasLimit: 150000 });

        await tx.wait();

        const filter = songRegister.filters.Registered(account);
        const events = await songRegister.queryFilter(filter);

        const eventLog = events[events.length - 1];

        const songwriter = eventLog.args[0];
        const songTitle = eventLog.args[1];
        const signature = eventLog.args[2];
        const blockNumber = eventLog.blockNumber;
        const transactionHash = eventLog.transactionHash;

        const data = [songwriter, songTitle, signature, blockNumber, transactionHash];

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
