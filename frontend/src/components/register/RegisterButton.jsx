import { Box, Button, Center, Flex, Highlight, Link, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState } from 'react';

function RegisterButton({
  signer,
  contractAddress,
  contractABI,
  title,
  songSignature,
  isRegistered,
  registerReceipt,
  isWriteButtonClicked,
  setTitle,
  setLyrics,
  setLyricsByLine,
  setIsSubmitted,
  setIsEncrypted,
  setSongSignature,
  setIsChecked,
  setIsDeposited,
  setDepositReceipt,
  setIsRegistered,
  setRegisterReceipt,
  setIsListed,
  setIsWriteButtonClicked,
}) {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerHash, setRegisterHash] = useState('');

  const register = async () => {
    try {
      setIsRegisterLoading(true);

      const SongRegister = new ethers.Contract(contractAddress, contractABI, signer);
      await SongRegister.connect(signer).register(title, songSignature, { gasLimit: 200000 });

      SongRegister.on('Registered', (songwriter, songTitle, songSignature, event) => {
        const registeredByLine = [];

        registeredByLine.push(songwriter);
        registeredByLine.push(songTitle);
        registeredByLine.push(songSignature);

        setRegisterReceipt(registeredByLine);
        setRegisterHash(event.transactionHash);
        setIsListed(false);
        setIsRegisterLoading(false);
        setIsRegistered(true);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    setIsSubmitted(false);
    setIsEncrypted(false);
    setIsChecked(false);
    setIsDeposited(false);
    setDepositReceipt([]);
    setIsRegistered(false);
    setRegisterReceipt([]);
    setIsWriteButtonClicked(true);
  };

  return (
    <Box w={820}>
      <Center>
        {isRegistered ? (
          <Box w={820} mt={20} mb={40}>
            <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
              <Text as="b" mb={30} fontSize="xx-large" color="#f1c550">
                Successfully Registered!
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Songwriter
              </Text>
              <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                {registerReceipt[0]}
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Song Title
              </Text>
              <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                {registerReceipt[1]}
              </Text>
              <Text as="b" mb={10} fontSize="x-large" color="#f1c550">
                Song Signature
              </Text>
              <Text as="em" mb={20} fontSize="x-large" color="#f1c550">
                {registerReceipt[2]}
              </Text>

              <Box w={820} mt={20}>
                <Text as="b" fontSize={20}>
                  See your register transaction details on{' '}
                  <Link color={'#884bf2'} href={`https://amoy.polygonscan.com/tx/${registerHash}`} isExternal>
                    Polygon Amoy Testnet Explorer
                  </Link>
                </Text>
              </Box>

              <Box w={820} mt={40} mb={20}>
                <Center>
                  <Button fontSize={20} onClick={handleClick}>
                    Write Another Song
                  </Button>
                </Center>
              </Box>
            </Flex>
          </Box>
        ) : isWriteButtonClicked ? (
          <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <Text as="b" fontSize={20} mt={20}>
              Let's write another song!
            </Text>
            <Text as="b" mt={40} mb={40} fontSize={20}>
              <Highlight query="Write" styles={{ px: '0.5em', py: '0.5em', border: '4px solid transparent', borderRadius: '3em', borderColor: '#f2f2f2', bg: '#60316e', color: 'white' }}>
                Go to Write to continue...
              </Highlight>
            </Text>
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
