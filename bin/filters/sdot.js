module.exports = ({ str, index, ext }) => {
  return { str: str.replace(/\./g, ''), index, ext };
};
