import { StoredCorrections } from "../../typings";

export default function useTextOutput(
  words: StoredCorrections[],
  originalText: any
) {
  let wordsArray = originalText.split(/\s+/); // Split originalText into array of words

  words.forEach((word) => {
    // Replace the word at the specified index
    if (word.start >= 0 && word.end < wordsArray.length) {
      wordsArray[
        word.start
      ] = `$${word.incorrectText}$\{${word.correctedText}\}`;
      for (let i = word.start + 1; i <= word.end; i++) {
        wordsArray[i] = "";
      }
    }
  });

  // Join the array back into a string
  let new$Output: string = wordsArray.join(" ");

  new$Output = new$Output.replace(/(\s+)/g, " "); // Remove extra spaces

  return new$Output;
}
