// Calculating word length frequency - Lab 3
const getWordLengthFrequency = (data, maxWordLength) => {
  // Init result array with all 0's
  const result = new Array(maxWordLength);
  result.fill(0);

  const wordArray = data.split(' ');  // Split string of words into array
  wordArray.forEach(element => {
    result[element.length - 1] += 1;  // +1 to result array index when counting word
  });

  // Turn array into string and return
  let resultString = "";
  for (let i = 0; i < maxWordLength; i++) {
    resultString = resultString + result[i] + " ";
  }
  return resultString;
}

module.exports = getWordLengthFrequency;