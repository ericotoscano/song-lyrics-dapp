export const formatAccount = (account) => {
  return account.substring(0, 7) + '...' + account.substring(account.length - 5);
};
export const formatAddress = (address) => {
  return address.substring(0, 13) + '...' + address.substring(address.length - 13);
};
