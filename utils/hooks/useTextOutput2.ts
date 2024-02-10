export default function useTextOutput2(
  storedCorrections: StoredCorrections[],
  originalText: string
) {
  let wordsArray = originalText.split(/\s+/); // Split originalText into array of words
  console.log("🚀 ~ wordsArray:\n", wordsArray);

  storedCorrections.forEach((correction, index) => {
    // Replace the word at the specified index
    if (correction.startIndex >= 0 && correction.endIndex < wordsArray.length) {
      wordsArray[
        correction.startIndex
      ] = `$${correction.incorrectText}$\{edit_type: "${correction.edit_type}, correct:"${correction.correctedText}", grammar: "${correction.grammar}", punctuation: "${correction.punctuation}"\}`;
      for (let i = correction.startIndex + 1; i <= correction.endIndex; i++) {
        wordsArray[i] = "";
      }
    }
  });

  const wordObjects = wordsArray
    .map((word, index) => {
      if (!word) return null; // Skip empty strings
      const correction = storedCorrections.find((c) => c.startIndex === index);
      return {
        correct: correction ? correction.correctedText : word,
        incorrect: correction ? word.split("$")[1] : null,
      };
    })
    .filter(Boolean); // Remove null values

  console.log(wordObjects);

  return wordObjects;
}
