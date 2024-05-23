export const formatAccount = (account) => {
  return account.substring(0, 7) + '...' + account.substring(account.length - 5);
};

export const formatSignature = (signature) => {
  return signature.substring(0, 18) + '...' + signature.substring(signature.length - 20);
};
