import React, { useEffect, useState } from "react";
import Dualdivs from "./Dualdivs";
import CorrectedText from "./CorrectedText";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { SentenceType, StoredCorrections } from "../../typings";
import { toast } from "react-hot-toast";
import useTextOutput from "../hooks/useTextOutput";
import OriginalText from "./OriginalText";
import Buttons from "./Buttons";

function TextSelection() {
  const session = useSession();
  const router = useRouter();

  console.log("session", session?.user?.email);

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
  const supabase = useSupabaseClient();
  const [text, setText] = useState<SentenceType>(null);
  const [skipped, setSkipped] = useState(false);

  const getOne = async () => {
    const notification = toast.loading("Getting new one...");

    try {
      const { data, error } = await supabase.rpc("select_random");

      if (data && data.length > 0) {
        setText(data[0]);
      }
      toast.success("Refreshed a new sentence!", {
        id: notification,
      });

      setStoredCorrections([]);
      divReset();
    } catch (error) {
      toast.error("Vul hoise", {
        id: notification,
      });
      console.log("error", error);
    }
  };

  useEffect(() => {
    getOne();
  }, [skipped]);

  //function to send data to the backend
  const sendData = async () => {
    const notification = toast.loading("Sending...");

    try {
      const { data, error } = await supabase
        .from("sentences")
        .update({
          incorrect_text: text?.incorrect_text,
          correct_text: useTextOutput(storedCorrections, text?.incorrect_text)
            .newText,
          is_checked: true,
          index: storedCorrections,
          email: session?.user?.email,
        })
        .eq("id", text?.id);

      toast.success("UpLoaded!", {
        id: notification,
      });

      setStoredCorrections([]);
      divReset();
      router.reload();
    } catch (error) {
      toast.error("mayre chudi", {
        id: notification,
      });
      console.log("error", error);
    }
  };

  //functions

  const correctionHandler = (submittedText: any, incText: any) => {
    if (selectedRange) {
      setStoredCorrections((prevSelectedRange) => {
        return [
          ...prevSelectedRange,
          {
            incorrectText: incText,
            correctedText: submittedText,
            start: selectedRange?.start,
            end: selectedRange?.end,
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

    if (storedCorrections.some((c) => c.start <= index && c.end >= index)) {
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
          (c.start >= start! && c.start <= index) ||
          (c.end >= start! && c.end <= index) ||
          (c.start <= start! && c.end >= index)
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
        (correction) => correction.start <= index && correction.end >= index
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
        sendData={sendData}
      />
    </div>
  );
}

export default TextSelection;
