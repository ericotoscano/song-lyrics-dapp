export const formatAddress = (address) => {
  return address.substring(0, 7) + '...' + address.substring(address.length - 5);
};
