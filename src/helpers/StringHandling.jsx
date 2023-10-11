// Function to truncate strings
const truncateString = (inputString, maxLength) => {
  if (inputString.length > maxLength) {
    return inputString.slice(0, maxLength - 3) + "...";
  } else {
    return inputString;
  }
};

// Function to add leading zero
const addLeadingZero = (number) => {
  if (number < 10) {
    return "0" + number; // Concatenate '0' to the number as a string
  } else {
    return number.toString(); // Convert the number to a string
  }
};

export { truncateString, addLeadingZero };
