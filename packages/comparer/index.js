const STR_ASC = (a, b) => a.localeCompare(b);
const STR_DESC = (a, b) => b.localeCompare(a);
const NUM_ASC = (a, b) => a - b;
const NUM_DESC = (a, b) => b - a;

const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

export { NUM_ASC, NUM_DESC, STR_ASC, STR_DESC, max, min };
