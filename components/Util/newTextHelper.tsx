import { StoredCorrections } from "../../typings";

export function newTextHandler(words: StoredCorrections[], originalText: any) {
  let newText = originalText;
  let newTextHiglighted = originalText;
  words.forEach((word: any) => {
    newTextHiglighted = newText?.replace(word.incorrectText, word.correctedText);
    newText = newText.replace(
      word.incorrectText,
      `$${word.incorrectText}$\{${word.correctedText}\}`
    );
  });
  return { newText, newTextHiglighted };
}
