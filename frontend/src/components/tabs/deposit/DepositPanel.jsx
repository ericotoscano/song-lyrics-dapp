import CostAndBalanceHeading from './CostAndBalanceHeading';
import CostAndBalanceButton from './CostAndBalanceButton';
import Result from './Result';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';

function DepositPanel({ account, signer, contractAddress, contractABI, isChecked, isDeposited, depositReceipt, setIsChecked, setIsDeposited, setDepositReceipt }) {
  const [currentCostInEther, setCurrentCostInEther] = useState(0);
  const [currentCostInGwei, setCurrentCostInGwei] = useState(0);
  const [currentBalanceInGwei, setCurrentBalanceInGwei] = useState(0);
  const [currentBalanceInEther, setCurrentBalanceInEther] = useState(0);
  const [isDepositLoaded, setIsDepositLoaded] = useState(false);
  const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);

  return (
    <Box>
      <Center>
        <TabPanel w={480}>
        <Flex alignItems={'center'} justifyContent="center" flexDirection={'column'}>
            <CostAndBalanceHeading />

            <CostAndBalanceButton
              account={account}
              contractAddress={contractAddress}
              contractABI={contractABI}
              currentCostInEther={currentCostInEther}
              currentCostInGwei={currentCostInGwei}
              currentBalanceInGwei={currentBalanceInGwei}
              currentBalanceInEther={currentBalanceInEther}
              isBalanceLoaded={isBalanceLoaded}
              signer={signer}
              isChecked={isChecked}
              depositReceipt={depositReceipt}
              setIsChecked={setIsChecked}
              setIsDeposited={setIsDeposited}
              setCurrentCostInEther={setCurrentCostInEther}
              setCurrentCostInGwei={setCurrentCostInGwei}
              setCurrentBalanceInGwei={setCurrentBalanceInGwei}
              setCurrentBalanceInEther={setCurrentBalanceInEther}
              setIsBalanceLoaded={setIsBalanceLoaded}
            />
            <Result
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              isChecked={isChecked}
              isDeposited={isDeposited}
              currentCostInGwei={currentCostInGwei}
              setCurrentBalanceInGwei={setCurrentBalanceInGwei}
              isDepositLoaded={isDepositLoaded}
              setIsDepositLoaded={setIsDepositLoaded}
              setIsDeposited={setIsDeposited}
              setDepositReceipt={setDepositReceipt}
            />
          </Flex>
        </TabPanel>
      </Center>
    </Box>
  );
}

export default DepositPanel;
