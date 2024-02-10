type Props = {
  text: string | null | undefined;
  highlightText: (index: number, word: string) => string;
  handleClick: (index: number) => void;
};

export default function OriginalText({
  text,
  highlightText,
  handleClick,
}: Props) {
  const regex = /\s/g;
  return (
    <div className="text-sm sm:text-xl cursor-pointer">
      {text?.split(regex).map((word, index) => (
        <span key={index} className="cursor-pointer">
          <span
            className={`p-1 ml-2 hover:shadow-xl rounded rounded-r-none  ${highlightText(
              index,
              word
            )}`}
            onClick={() => handleClick(index)}
          >
            {word}
          </span>
          <span
            className={`pl-0 p-1 bg-blue-400 sm:bg-blue-100 rounded-r-full hover:bg-blue-400 text-blue-400 hover:text-white`}
          >
            +
          </span>
        </span>
      ))}
      {/* <pre>{JSON.stringify(text)}</pre>
      -----split-----
      <pre>{JSON.stringify(text)?.split(regex)}</pre>
      -----filter----
      <pre>
        {JSON.stringify(text?.split(regex).filter((word) => word !== ""))}
      </pre> */}
    </div>
  );
}
