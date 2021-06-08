const piler = (cur, pre) => {
  if (cur === 'I') return 1;
  if (cur === 'V') return pre === 'I' ? 3 : 5;
  if (cur === 'X') return pre === 'I' ? 8 : 10;
  if (cur === 'L') return pre === 'X' ? 30 : 50;
  if (cur === 'C') return pre === 'X' ? 80 : 100;
  if (cur === 'D') return pre === 'C' ? 300 : 500;
  if (cur === 'M') return pre === 'C' ? 800 : 1000;
};

const romanToDecimal = roman => {
  var _roman;

  let l = (_roman = roman) == null ? void 0 : _roman.length,
      acc = 0,
      pre = 'O';
  if (!l) return acc;
  roman = roman.toUpperCase();

  for (let cur, i = 0; i < l && (cur = roman[i]); i++) {
    acc += piler(cur, pre);
    pre = cur;
  }

  return acc;
};

export { romanToDecimal };
