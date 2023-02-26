import { StoredCorrections } from "../../typings";

export default function useTextOutput(
  words: StoredCorrections[],
  originalText: any
) {
  let newText: string = originalText;
  let newTextHighlighted: string = originalText;
  words.forEach((word: any) => {
    newTextHighlighted = newTextHighlighted?.replace(
      word.incorrectText,
      word.correctedText
    );
    newText = newText.replace(
      word.incorrectText,
      `$${word.incorrectText}$\{${word.correctedText}\}`
    );
  });
  return { newText, newTextHighlighted };
}
