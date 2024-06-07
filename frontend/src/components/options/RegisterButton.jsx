import { Box, Button, Center } from '@chakra-ui/react';

function RegisterButton({ setIsCheckButtonClicked, setIsRegisterButtonClicked }) {
  const handleClick = () => {
    setIsRegisterButtonClicked(true);
    setIsCheckButtonClicked(false);
  };

  return (
    <Box>
      <Center>
        <Button minWidth={300} fontSize={20} mt={40} mb={20} bgColor="#60316e" color="#f2f2f2" onClick={handleClick}>
          Register a Song
        </Button>
      </Center>
    </Box>
  );
}

export default RegisterButton;
