import { dummyText } from "@/utils/data/dummyData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Buttons from "./Buttons";
import CorrectedText from "./CorrectedText";
import Dualdivs from "./Dualdivs";
import OriginalText from "./OriginalText";

function TextSelection() {
  const router = useRouter();

  //states
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<
    | {
        start: number;
        end: number;
      }
    | undefined
  >(undefined);

  const [storedCorrections, setStoredCorrections] = useState<
    StoredCorrections[]
  >([]);

  //get one sentence from the database
  const [text, setText] = useState<{
    correct_text: string | null;
    created_at: string | null;
    id: number;
    incorrect_text: string | null;
    index: [] | null;
    is_checked: boolean;
  } | null>(dummyText);
  const [skipped, setSkipped] = useState(false);

  // const getOne = async () => {
  //   const notification = toast.loading("Fetching a sentence...");

  //   try {
  //     const { data, error } = await supabase.rpc("select_random");

  //     if (data.length === 0) {
  //       toast("Found nothing", {
  //         icon: "🥺",
  //         id: notification,
  //       });
  //     }

  //     if (data && data.length > 0) {
  //       setText(data[0]);
  //       toast.success("Refreshed a new sentence!", {
  //         id: notification,
  //       });
  //     }

  //     setStoredCorrections([]);
  //     divReset();
  //   } catch (error) {
  //     toast.error("Vul hoise", {
  //       id: notification,
  //     });
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   getOne();
  // }, [skipped]);

  //function to send data to the backend
  // const sendData = async () => {
  //   const notification = toast.loading("Sending...");

  //   try {
  //     const { data, error } = await supabase
  //       .from("sentences")
  //       .update({
  //         incorrect_text: text?.incorrect_text,
  //         correct_text: useTextOutput(storedCorrections, text?.incorrect_text),
  //         is_checked: true,
  //         index: storedCorrections,
  //         email: session?.user?.email,
  //       })
  //       .eq("id", text?.id);

  //     toast.success("UpLoaded!", {
  //       id: notification,
  //     });

  //     setStoredCorrections([]);
  //     divReset();
  //     router.reload();
  //   } catch (error) {
  //     toast.error("Something went brrrr", {
  //       id: notification,
  //     });
  //     console.log("error", error);
  //   }
  // };

  //functions

  const correctionHandler = (submittedText: any, incText: any) => {
    if (selectedRange) {
      setStoredCorrections((prevSelectedRange) => {
        return [
          ...prevSelectedRange,
          {
            incorrectText: incText,
            correctedText: submittedText,
            startIndex: selectedRange?.start,
            endIndex: selectedRange?.end,
          },
        ];
      });
      divReset();
    }

    console.log("storedCorrection", storedCorrections);
  };

  const divReset = () => {
    setSelectedRange(undefined);
    setSelectedWords([]);
  };

  const resetHandler = () => {
    divReset();
    setStoredCorrections([]);
  };

  const handleClick = (index: number) => {
    let start = selectedRange?.start;
    let end = selectedRange?.end;

    if (
      storedCorrections.some(
        (c) => c.startIndex <= index && c.endIndex >= index
      )
    ) {
      return;
    }
    if (
      selectedRange &&
      index >= selectedRange.start &&
      index <= selectedRange.end
    ) {
      setSelectedRange(undefined);
      setSelectedWords([]);
      return;
    }

    if (start === undefined || end === undefined) {
      start = index;
      end = index;
    } else {
      if (index >= start && index <= end) {
        // clicked within existing selection, do nothing
        return;
      }

      // check for overlap with existing corrections
      const overlaps = storedCorrections.some((c) => {
        return (
          (c.startIndex >= start! && c.startIndex <= index) ||
          (c.endIndex >= start! && c.endIndex <= index) ||
          (c.startIndex <= start! && c.endIndex >= index)
        );
      });

      if (overlaps) {
        return;
      }

      end = index;
      if (start > end) {
        const temp = start;
        start = end;
        end = temp;
      }
    }

    setSelectedRange({
      start: start,
      end: end,
    });
    setSelectedWords(
      text && text.incorrect_text
        ? text.incorrect_text.split(" ").slice(start, end + 1)
        : []
    );
  };

  const highlightText = (index: number, word: string) => {
    if (
      storedCorrections.some(
        (correction) =>
          correction.startIndex <= index && correction.endIndex >= index
      )
    ) {
      return "border border-green-200 shadow-md bg-green-50 text-green-600";
    } else if (
      selectedWords?.includes(word) && selectedRange
        ? selectedRange.start <= index && selectedRange.end >= index
        : false
    ) {
      return "border border-red-200 shadow-md bg-red-50 text-red-500";
    } else {
      return "border border-gray-200";
    }
  };

  return (
    <div className="flex flex-col px-10 w-full text-sm sm:text-xl">
      {/* Display Original Text */}
      <div className="container flex-grow">
        <OriginalText
          text={text?.incorrect_text}
          highlightText={highlightText}
          handleClick={handleClick}
        />
      </div>

      {/* Display clicked words */}
      <div className="container mt-4">
        <Dualdivs
          selectedText={selectedWords}
          correctionHandler={correctionHandler}
        />
        <CorrectedText
          words={storedCorrections}
          originalText={text?.incorrect_text || ""}
        />
      </div>

      <Buttons
        skipped={skipped}
        setSkipped={setSkipped}
        resetHandler={resetHandler}
        // sendData={sendData}
      />
    </div>
  );
}

export default TextSelection;
