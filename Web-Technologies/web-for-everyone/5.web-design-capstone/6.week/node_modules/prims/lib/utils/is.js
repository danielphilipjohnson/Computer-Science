function isObjectLiteralEmpty(val) {
  return val === Object(val)
  && Object.prototype.toString.call(val) === '[object Object]'
  && Object.keys(val).length === 0;
}

function isObjectLiteral(val) {
  return val === Object(val)
  && Object.prototype.toString.call(val) === '[object Object]';
}

function isNumeric(val){
  return !isNaN(val)
}

function isBool(val) {
  return typeof val === 'boolean';
}

module.exports = {
  isObjectLiteralEmpty,
  isObjectLiteral,
  isNumeric,
  isBool
};
