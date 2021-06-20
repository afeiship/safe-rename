module.exports = ({ str, index, ext }) => {
  return { str: nx.underscored(str), index, ext };
};
