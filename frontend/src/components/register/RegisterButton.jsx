import { Box, Button, Center, Flex, Link, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

function RegisterButton({ signer, contractAddress, contractABI, songSignature, isRegistered, registerReceipt, setIsRegistered, setRegisterReceipt }) {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerHash, setRegisterHash] = useState('');

  const register = async () => {
    try {
      setIsRegisterLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await SongRegister.connect(signer).register(songSignature, { gasLimit: 150000 });

      SongRegister.on('Registered', async (sender, signature) => {
        const receipt = await tx.wait();
        const registeredByLine = [];

        registeredByLine.push('Songwriter');
        registeredByLine.push(sender);
        registeredByLine.push('Song Signature');
        registeredByLine.push(signature);

        setRegisterReceipt(registeredByLine);
        setIsRegistered(true);
        setRegisterHash(receipt.transactionHash);
        setIsRegisterLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box w={820} mb={40}>
      <Center>
        {isRegistered ? (
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            <Text as="b" mb={40} mt={20} fontSize={25} color="#f1c550">
              Successfully Registered!
            </Text>

            {registerReceipt.map((line, index) => (
              <li key={index}>
                <Box mb={15} w={820}>
                  <Text as="em" fontSize="x-large" align="center" color="#f1c550">
                    {line}
                  </Text>
                </Box>
              </li>
            ))}

            <Box w={820} mt={20} mb={20}>
              <Text as="b" fontSize={20}>
                See your register transaction details on{' '}
                <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${registerHash}`} isExternal>
                  Polygon Amoy Testnet Explorer
                </Link>
              </Text>
            </Box>
          </Flex>
        ) : (
          <Box w={820}>
            <Text fontSize={20}>Now it's time to register your song!</Text>
            <Box mt={40}>
              <Center>
                <Button isLoading={isRegisterLoading} loadingText="Registering Song..." fontSize={20} onClick={register}>
                  Register Your Song
                </Button>
              </Center>
            </Box>
          </Box>
        )}
      </Center>
    </Box>
  );
}

export default RegisterButton;
