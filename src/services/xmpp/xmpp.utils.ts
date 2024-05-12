export function generateRandomDigitsForChat(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generates a random integer from 0 to 9
    result += randomDigit.toString();
  }

  // Check if the first character is "0" and replace it with "1"
  if (result.startsWith("0")) {
    result = "1" + result.substring(1);
  }

  return result;
}
