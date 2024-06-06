import CostAndBalanceHeading from './CostAndBalanceHeading';
import BalanceReceipt from './BalanceReceipt';
import CostAndBalanceButton from './CostAndBalanceButton';
import BalanceMessage from './BalanceMessage';
import DepositButton from './DepositButton';

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

            {isChecked ? (
              <Flex alignItems={'start'} justifyContent="center" flexDirection={'column'}>
                <BalanceReceipt
                  currentCostInEther={currentCostInEther}
                  currentCostInGwei={currentCostInGwei}
                  currentBalanceInGwei={currentBalanceInGwei}
                  currentBalanceInEther={currentBalanceInEther}
                  depositReceipt={depositReceipt}
                  depositHash={depositHash}
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
              </Flex>
            ) : (
              <CostAndBalanceButton
                account={account}
                signer={signer}
                contractAddress={contractAddress}
                contractABI={contractABI}
                isBalanceLoading={isBalanceLoading}
                setIsChecked={setIsChecked}
                setIsDeposited={setIsDeposited}
                setCurrentCostInEther={setCurrentCostInEther}
                setCurrentCostInGwei={setCurrentCostInGwei}
                setCurrentBalanceInGwei={setCurrentBalanceInGwei}
                setCurrentBalanceInEther={setCurrentBalanceInEther}
                setIsBalanceLoading={setIsBalanceLoading}
              />
            )}

            {isChecked && !isDeposited && isContractStatusChecked ? (
              <DepositButton
                signer={signer}
                contractAddress={contractAddress}
                contractABI={contractABI}
                isPaused={isPaused}
                currentCostInEther={currentCostInEther}
                currentCostInGwei={currentCostInGwei}
                isDepositLoading={isDepositLoading}
                setIsDeposited={setIsDeposited}
                setCurrentBalanceInGwei={setCurrentBalanceInGwei}
                setIsDepositLoading={setIsDepositLoading}
                setDepositHash={setDepositHash}
                setDepositReceipt={setDepositReceipt}
              />
            ) : null}
          </Flex>
        </Center>
      </Box>
    </TabPanel>
  );
}

export default DepositPanel;
