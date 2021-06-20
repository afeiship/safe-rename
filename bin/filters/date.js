module.exports = ({ str, index, ext }) => {
  return { str: `${nx.Date.format(null, 'date')}_${str}`, index, ext };
};
