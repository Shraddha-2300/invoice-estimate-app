const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const convertBelowThousand = (num) => {
  if (num === 0) return "";
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  return ones[Math.floor(num / 100)] + " Hundred " + convertBelowThousand(num % 100);
};

const numberToWords = (num) => {
  if (num === 0) return "Zero";

  let result = "";

  if (num >= 10000000) {
    result += convertBelowThousand(Math.floor(num / 10000000)) + " Crore ";
    num %= 10000000;
  }

  if (num >= 100000) {
    result += convertBelowThousand(Math.floor(num / 100000)) + " Lakh ";
    num %= 100000;
  }

  if (num >= 1000) {
    result += convertBelowThousand(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }

  if (num > 0) {
    result += convertBelowThousand(num);
  }

  return result.trim() + " Only";
};

export default numberToWords;