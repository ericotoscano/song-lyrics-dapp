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
  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [depositHash, setDepositHash] = useState('');

  return (
    <TabPanel>
      <Box>
        <Center>
          <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
            <CostAndBalanceHeading />

            <CostAndBalanceButton
              account={account}
              contractAddress={contractAddress}
              contractABI={contractABI}
              currentCostInEther={currentCostInEther}
              currentCostInGwei={currentCostInGwei}
              currentBalanceInGwei={currentBalanceInGwei}
              currentBalanceInEther={currentBalanceInEther}
              isBalanceLoading={isBalanceLoading}
              signer={signer}
              isChecked={isChecked}
              depositReceipt={depositReceipt}
              depositHash={depositHash}
              setIsChecked={setIsChecked}
              setIsDeposited={setIsDeposited}
              setCurrentCostInEther={setCurrentCostInEther}
              setCurrentCostInGwei={setCurrentCostInGwei}
              setCurrentBalanceInGwei={setCurrentBalanceInGwei}
              setCurrentBalanceInEther={setCurrentBalanceInEther}
              setIsBalanceLoading={setIsBalanceLoading}
            />

            <Result
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              isChecked={isChecked}
              isDeposited={isDeposited}
              currentCostInGwei={currentCostInGwei}
              currentCostInEther={currentCostInEther}
              isDepositLoading={isDepositLoading}
              setCurrentBalanceInGwei={setCurrentBalanceInGwei}
              setDepositHash={setDepositHash}
              setIsDepositLoading={setIsDepositLoading}
              setIsDeposited={setIsDeposited}
              setDepositReceipt={setDepositReceipt}
            />
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default DepositPanel;
