export default function useTextOutput(
  words: StoredCorrections[],
  originalText: any
) {
  let wordsArray = originalText.split(/\s+/); // Split originalText into array of words

  words.forEach((word) => {
    // Replace the word at the specified index
    if (word.startIndex >= 0 && word.endIndex < wordsArray.length) {
      wordsArray[
        word.startIndex
      ] = `$${word.incorrectText}$\{edit_type: "${word.edit_type}, correct:"${word.correctedText}", grammar: "${word.grammar}", punctuation: "${word.punctuation}"\}`;
      for (let i = word.startIndex + 1; i <= word.endIndex; i++) {
        wordsArray[i] = "";
      }
    }
  });

  // Join the array back into a string
  let new$Output: string = wordsArray.join(" ");

  new$Output = new$Output.replace(/(\s+)/g, " "); // Remove extra spaces

  return new$Output;
}
