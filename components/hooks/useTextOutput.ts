import { StoredCorrections } from "../../typings";

export default function useTextOutput(
  words: StoredCorrections[],
  originalText: any
) {
  let newText = originalText;
  let newTextHiglighted = originalText;
  words.forEach((word: any) => {
    newTextHiglighted = newTextHiglighted?.replace(
      word.incorrectText,
      word.correctedText
    );
    newText = newText.replace(
      word.incorrectText,
      `$${word.incorrectText}$\{${word.correctedText}\}`
    );
  });
  return { newText, newTextHiglighted };
}
