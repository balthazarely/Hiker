export const convertToNum = (string) => {
  let number = parseFloat(string);
  let rounded = number.toFixed(8);
  return parseFloat(rounded);
};

export function getTodaysDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  return today;
}

export function textLimiter(str) {
  return str.length > 90 ? str.slice(0, 90) + "..." : str.slice(0, 90);
}

export  function convertToTimeStamp(date) {
  return new Date(date).getTime()
}

export function timeStampToDate(date) {
  return new Date(date).toDateString().split(' ').slice(1).join(' ');
}
 