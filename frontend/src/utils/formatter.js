export const formatAccount = (account) => {
  return account.substring(0, 7) + '...' + account.substring(account.length - 5);
};
