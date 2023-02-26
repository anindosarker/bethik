import { StoredCorrections } from "../../typings";

export default function useTexHighlight(
  words: StoredCorrections[],
  originalText: string
) {
  let wordsArray = originalText.split(/\s+/); // Split originalText into array of words

  words.forEach((word) => {
    // Replace the word at the specified index
    if (word.start >= 0 && word.end < wordsArray.length) {
      wordsArray[word.start] = word.correctedText;
      for (let i = word.start + 1; i <= word.end; i++) {
        wordsArray[i] = "";
      }
    }
  });

  // Join the array back into a string
  let newTextHighlighted: string = wordsArray.join(" ");

  newTextHighlighted = newTextHighlighted.replace(/(\s+)/g, " "); // Remove extra spaces

  return newTextHighlighted;
}
