module.exports = ({ str, index, ext }) => {
  return { str: nx.camelize(str), index, ext };
};
