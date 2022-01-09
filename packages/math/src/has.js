export const hasOpen = ({ min, max }, num) => min < num && num < max
export const hasLOpen = ({ min, max }, num) => min < num && num <= max
export const hasROpen = ({ min, max }, num) => min <= num && num < max
export const has = ({ min, max }, num) => min <= num && num <= max