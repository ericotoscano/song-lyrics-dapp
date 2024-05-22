import { Box, Button, Center } from '@chakra-ui/react';

function Register({ setIsCheckButtonClicked, setIsRegisterButtonClicked }) {
  const handleClick = (event) => {
    event.preventDefault();
    setIsRegisterButtonClicked(true);
    setIsCheckButtonClicked(false);
  };

  return (
    <Box>
      <Center>
        <Button fontSize={20} mt={20} mb={20} marginInline={15} bgColor="#60316e" color="#f2f2f2" onClick={handleClick}>
          Register a Song
        </Button>
      </Center>
    </Box>
  );
}

export default Register;
