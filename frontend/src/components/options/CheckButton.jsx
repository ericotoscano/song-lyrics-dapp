import { Box, Button, Center } from '@chakra-ui/react';

function CheckButton({ setIsCheckButtonClicked, setIsRegisterButtonClicked }) {
  const handleClick = () => {
    setIsCheckButtonClicked(true);
    setIsRegisterButtonClicked(false);

//    if(isSubmmited && isEncrypted && isRegistered && !isCloseReceiptButtonClicked)
  };

  return (
    <Box>
      <Center>
        <Button minWidth={300} fontSize={20} mt={20} mb={60} bgColor="#4b6289" color="#f2f2f2" onClick={handleClick}>
          Check Your Songs
        </Button>
      </Center>
    </Box>
  );
}

export default CheckButton;
