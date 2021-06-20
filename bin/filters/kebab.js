module.exports = ({ str, index, ext }) => {
  return { str: nx.kebabCase(str), index, ext };
};
