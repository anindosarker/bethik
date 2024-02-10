export default function useTexHighlight(
  words: StoredCorrections[],
  originalText: string
) {
  let wordsArray = originalText.split(/\s+/); // Split originalText into array of words

  words.forEach((word) => {
    // Replace the word at the specified index
    if (word.startIndex >= 0 && word.endIndex < wordsArray.length) {
      wordsArray[word.startIndex] = word.correctedText;
      for (let i = word.startIndex + 1; i <= word.endIndex; i++) {
        wordsArray[i] = "";
      }
    }
  });

  // Join the array back into a string
  let newTextHighlighted: string = wordsArray.join(" ");

  newTextHighlighted = newTextHighlighted.replace(/(\s+)/g, " "); // Remove extra spaces

  return newTextHighlighted;
}
