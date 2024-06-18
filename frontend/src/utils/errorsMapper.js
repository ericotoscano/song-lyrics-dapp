export const errorsMapper = ({ name, type, reason }) => {
  switch (name) {
    case 'NotOwner':
      return `${type}: Only owner has permission to do that.`;
    case 'Paused':
      return `${type}: Contract is Paused.`;
    case 'ValueMustBeEqualCost':
      return `${type}: The value sent is not equal to cost.`;
    default:
      return `${type}: ${reason}`;
  }
};
