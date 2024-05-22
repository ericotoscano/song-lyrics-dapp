import { Box, Button, Center } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { formatAccount } from '../../utils/formatAccount';

function ConnectButton({ account, setAccount, setAccountFormatted, setSigner }) {
  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (account !== accounts[0]) {
        const account = formatAccount(accounts[0]);

        setAccount(accounts[0]);
        setAccountFormatted(account);
        setSigner(provider.getSigner(accounts[0]));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Center>
        <Button onClick={getAccount} bgColor="#29a19c" color="#f2f2f2">
          Connect Your Account
        </Button>
      </Center>
    </Box>
  );
}

export default ConnectButton;
