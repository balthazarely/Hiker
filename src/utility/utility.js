import { DomainDisabledRounded } from "@material-ui/icons";

export const convertToNum = (string) => {
  let number = parseFloat(string);
  let rounded = number.toFixed(8);
  return parseFloat(rounded);
};

// export function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export function getTodaysDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  return today;
}
