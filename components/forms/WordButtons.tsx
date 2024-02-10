import { RiSpace } from "react-icons/ri";
import { Button } from "../ui/button";
type WordButtonProps = {
  text?: string;
  highlightText: (index: number, word: string) => string;
  handleClick: (index: number) => void;
  selectedWords: string[];
};

export default function WordButtons({
  text,
  highlightText,
  handleClick,
  selectedWords,
}: WordButtonProps) {
  const regex = /\s/g;

  return (
    <div className="flex flex-wrap flex-col gap-4">
      <div className="font-semibold">Click a word or phrase to edit</div>
      <p className="flex flex-wrap items-center justify-start gap-2 border p-4 rounded">
        {text?.split(regex).map((word, index, array) => (
          <span key={index} className="flex flex-wrap gap-2">
            {index !== 0 && (
              <Button
                type="button"
                // className={`${highlightText(index, word)}`}
                disabled
                variant="outline"
              >
                <RiSpace />
              </Button>
            )}

            <Button
              type="button"
              className={`${highlightText(index, word)}`}
              onClick={() => handleClick(index)}
              variant="outline"
            >
              {word}
            </Button>
          </span>
        ))}
      </p>
    </div>
  );
}
