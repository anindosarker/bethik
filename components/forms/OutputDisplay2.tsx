import useTexHighlight from "@/utils/hooks/useTextHighlight";
import useTextOutput from "@/utils/hooks/useTextOutput";
import useTextOutput2 from "@/utils/hooks/useTextOutput2";

type Props = {
  storedCorrections: StoredCorrections[];
  originalText: string;
};

export default function OutputDisplay2({
  storedCorrections,
  originalText,
}: Props) {
  const highlightText = (words: StoredCorrections[], word: string) => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].correctedText === word) {
        return "bg-green-100 p-1 px-2 rounded ";
      }
    }
    return "";
  };

  const wordObjects = useTextOutput2(storedCorrections, originalText);
  const textHighlight = useTexHighlight(storedCorrections, originalText);
  const correctText = useTextOutput(storedCorrections, originalText);

  return (
    <div className="flex flex-col space-y-4 mt-10 max-w-full">
      <div className="font-semibold">Corrections</div>
      <div className="flex flex-wrap gap-4">
        {wordObjects.map((word, index) => (
          <div
            key={index}
            className={`flex flex-col items-center border-b text-muted-foreground`}
          >
            <div
              className={`${word?.incorrect && "line-through text-red-400"}`}
            >
              {word?.incorrect ? word?.incorrect : word?.correct}
            </div>
            <div className="text-green-600">
              {word?.incorrect && word?.correct}
            </div>
          </div>
        ))}
      </div>
      <p className="">{wordObjects.map((word) => word?.correct + " ")}</p>
      <div className="font-semibold">Output Format</div>
      <p className="text-muted-foreground text-sm">{correctText}</p>
    </div>
  );
}
