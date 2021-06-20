module.exports = ({ str, index }) => {
  return { str: `${nx.Date.format(null,'date')}_${str}`, index };
};
