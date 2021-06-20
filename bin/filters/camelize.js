module.exports = ({ str, index }) => {
  return { str: nx.camelize(str), index };
};
