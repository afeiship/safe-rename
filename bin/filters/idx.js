module.exports = ({ str, index }) => {
  const idx = String(index + 1).padStart(3, '0');
  return { str: `${idx}_${str}`, index };
};
