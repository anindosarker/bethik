import useTexHighlight from "@/lib/hooks/useTextHighlight";
import useTextOutput from "@/lib/hooks/useTextOutput";

type Props = {
  words: StoredCorrections[];
  originalText: string;
};

function CorrectedText({ words, originalText }: Props) {
  const highlightText = (words: StoredCorrections[], word: string) => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].correctedText === word) {
        return "bg-green-100 p-1 px-2 rounded ";
      }
    }
    return "";
  };

  const text = useTextOutput(words, originalText);
  const textHighlight = useTexHighlight(words, originalText);

  return (
    <div className="container flex flex-col space-y-4 mt-10">
      <h2>Original:</h2>
      {originalText}

      <div className="font-semibold text-green-600 rounded-full ">
        {textHighlight?.split(" ").map((word: string, index: number) => (
          <span
            key={index}
            className={`inline-block m-2 ${highlightText(words, word)}`}
          >
            {word}{" "}
          </span>
        ))}
      </div>

      <div className="border-2 shadow-md  p-2 rounded-md bg-orange-200">
        <div className="text-xs text-gray-500">Output Format</div>
        <div className="text-gray-700 rounded-full ">{text}</div>
      </div>
    </div>
  );
}

export default CorrectedText;
