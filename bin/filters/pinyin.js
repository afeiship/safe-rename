var pinyin = require('pinyin');

module.exports = ({ str, index, ext }) => {
  var pystr = pinyin(str, { style: pinyin.STYLE_NORMAL }).join('');
  return { str: pystr, index, ext };
};
