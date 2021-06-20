module.exports = ({ str, index, ext }) => {
  return { str: nx.classify(str), index, ext };
};
