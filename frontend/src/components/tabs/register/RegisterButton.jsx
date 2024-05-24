import { Box, Button, Center, Flex, Link, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { formatAccount, formatSignature } from '../../../utils/formatter';

function RegisterButton({ signer, contractAddress, contractABI, songSignature, isRegistered, registerReceipt, setIsRegistered, setRegisterReceipt }) {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const [transactionHash, setTransactionHash] = useState('');

  const register = async () => {
    try {
      setIsRegisterLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await SongRegister.connect(signer).register(songSignature, { gasLimit: 150000 });

      SongRegister.on('Registered', async (sender, signature) => {
        const registeredByLine = [];
        const receipt = await tx.wait();

        registeredByLine.push('Song Writer:');
        registeredByLine.push(formatAccount(sender));
        registeredByLine.push('Song Signature Short Version:');
        registeredByLine.push(formatSignature(signature));
        registeredByLine.push('Transaction Hash Short Version:');
        registeredByLine.push(formatSignature(receipt.transactionHash));

        setRegisterReceipt(registeredByLine);
        setIsRegistered(true);
        setTransactionHash(receipt.transactionHash);
        setIsRegisterLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box mb={40}>
      {isRegistered ? (
        <Flex alignItems={'center'} flexDirection={'column'}>
          <Center>
            <Text as="b" mb={20} fontSize={20} color="#f1c550">
              Successfully Registered!
            </Text>
          </Center>

          <Flex alignItems={'start'} flexDirection={'column'}>
            {registerReceipt.map((line, index) => (
              <li key={index}>
                <Box mb={15}>
                  <Text as="em" fontSize="x-large" align="center" color="#f1c550">
                    {line}
                  </Text>
                </Box>
              </li>
            ))}
          </Flex>
          <Box>
            <Center>
              <Text as="b" mt={20} fontSize={20}>
                See on{' '}
                <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${transactionHash}`} isExternal>
                  Polygon Amoy Testnet Explorer
                </Link>
              </Text>
            </Center>
          </Box>
        </Flex>
      ) : (
        <Flex alignItems={'center'} flexDirection={'column'}>
          <Text fontSize={20}>Now it's time to register your song!</Text>
          <Button isLoading={isRegisterLoading} loadingText="Registering Song..." fontSize={20} mt={20} mb={20} onClick={register}>
            Register Your Song
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default RegisterButton;
