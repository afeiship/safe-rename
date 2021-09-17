module.exports = ({ str, index, ext }) => {
  return { str: nx.cdbCase(str), index, ext };
};
