export const convertToNum = (string) => {
  let number = parseFloat(string);
  let rounded = number.toFixed(8);
  return parseFloat(rounded);
};

// export function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
