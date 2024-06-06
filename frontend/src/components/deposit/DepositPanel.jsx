import CostAndBalanceHeading from './CostAndBalanceHeading';
import CostAndBalanceButton from './CostAndBalanceButton';
import BalanceMessage from './BalanceMessage';
import Deposit from './Deposit';

import { Box, Center, Flex, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';

function DepositPanel({ account, signer, contractAddress, contractABI, isChecked, isDeposited, depositReceipt, setIsChecked, setIsDeposited, setDepositReceipt }) {
  const [currentCostInEther, setCurrentCostInEther] = useState(0);
  const [currentCostInGwei, setCurrentCostInGwei] = useState(0);
  const [currentBalanceInGwei, setCurrentBalanceInGwei] = useState(0);
  const [currentBalanceInEther, setCurrentBalanceInEther] = useState(0);
  const [isDepositLoading, setIsDepositLoading] = useState(false);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [isPausedLoading, setIsPausedLoading] = useState(false);
  const [isContractStatusChecked, setIsContractStatusChecked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
              isPausedLoading={isPausedLoading}
              signer={signer}
              isChecked={isChecked}
              depositReceipt={depositReceipt}
              isPaused={isPaused}
              depositHash={depositHash}
              setIsChecked={setIsChecked}
              setIsDeposited={setIsDeposited}
              setIsPaused={setIsPaused}
              setCurrentCostInEther={setCurrentCostInEther}
              setCurrentCostInGwei={setCurrentCostInGwei}
              setCurrentBalanceInGwei={setCurrentBalanceInGwei}
              setCurrentBalanceInEther={setCurrentBalanceInEther}
              setIsBalanceLoading={setIsBalanceLoading}
              setIsPausedLoading={setIsPausedLoading}
            />

            <BalanceMessage
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              isChecked={isChecked}
              isDeposited={isDeposited}
              isPausedLoading={isPausedLoading}
              setIsPaused={setIsPaused}
              setIsContractStatusChecked={setIsContractStatusChecked}
              setIsPausedLoading={setIsPausedLoading}
            />

            <Deposit
              signer={signer}
              contractAddress={contractAddress}
              contractABI={contractABI}
              isChecked={isChecked}
              isDeposited={isDeposited}
              isPaused={isPaused}
              currentCostInEther={currentCostInEther}
              currentCostInGwei={currentCostInGwei}
              isDepositLoading={isDepositLoading}
              isContractStatusChecked={isContractStatusChecked}
              setIsDeposited={setIsDeposited}
              setCurrentBalanceInGwei={setCurrentBalanceInGwei}
              setIsDepositLoading={setIsDepositLoading}
              setDepositHash={setDepositHash}
              setDepositReceipt={setDepositReceipt}
            />
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default DepositPanel;
