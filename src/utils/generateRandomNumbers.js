/**
 * Generates unique values between 0 and `maxValue` and returns them into array
 * @param length {number} Number of elements of array
 * @param maxValue {number} Max value of the array
 * @return {Array<number>}
 */
function generateRandomNumbers(length, maxValue) {
  const arr = [];
  while (arr.length < length) {
    const r = Math.floor(Math.random() * maxValue) + 1;
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
}

export default generateRandomNumbers;
