module.exports = ({ str, index, ext }) => {
  return { str: str.replace(/\s/g, ''), index, ext };
};
