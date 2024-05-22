import { Box, Button, Center } from '@chakra-ui/react';

function Check({ setIsCheckButtonClicked, setIsRegisterButtonClicked }) {
  const handleClick = (event) => {
    event.preventDefault();
    setIsCheckButtonClicked(true)
    setIsRegisterButtonClicked(false)
  };
  return (
    <Box>
      <Center>
        <Button fontSize={20} mt={20} mb={20} marginInline={15} bgColor="#4b6289" color="#f2f2f2" onClick={handleClick}>
          Check Your Songs
        </Button>
      </Center>
    </Box>
  );
}

export default Check;
