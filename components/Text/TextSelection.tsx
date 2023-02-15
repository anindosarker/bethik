import React, { useEffect, useState } from "react";
import Dualdivs from "./Dualdivs";
import { start } from "repl";
import CorrectedText from "./CorrectedText";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { newTextHandler } from "../Util/newTextHelper";
import { useRouter } from "next/router";
import { SentenceType, StoredCorrections } from "../../typings";
import { toast } from "react-hot-toast";

function TextSelection() {
  // log the session
  const session = useSession();
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

  //TODO: queries
  //get one sentence from the database
  const supabase = useSupabaseClient();
  const [text, setText] = useState<SentenceType>(null);

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
    } catch (error) {
      toast.error("mayre chudi", {
        id: notification,
      });
      console.log("error", error);
    }
  };
  useEffect(() => {
    getOne();
  }, []);

  //function to send data to the backend
  const sendData = async () => {
    const notification = toast.loading("Sending...");

    try {
      const { data, error } = await supabase
        .from("sentences")
        .update({
          incorrect_text: text?.incorrect_text,
          correct_text: newTextHandler(storedCorrections, text?.incorrect_text)
            .newText,
          is_checked: true,
          index: storedCorrections,
          email: session?.user?.email,
        })
        .eq("id", text?.id);

      toast.success("UpLoaded!", {
        id: notification,
      });

      router.reload();
    } catch (error) {
      toast.error("mayre chudi", {
        id: notification,
      });
      console.log("error", error);
    }
  };

  //functions

  const handleClick = (index: number) => {
    if (
      storedCorrections.some(
        (correction) => correction.start <= index && correction.end >= index
      )
    ) {
      return;
    }

    let start = selectedRange?.start;
    let end = selectedRange?.end;
    if (start === undefined || end === undefined) {
      start = index;
      end = index;
    } else {
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

  const highlightText = (index: number, word: string) => {
    if (
      storedCorrections.some(
        (correction) => correction.start <= index && correction.end >= index
      )
    ) {
      return "bg-green-500 text-white";
    } else if (selectedWords.includes(word)) {
      return "bg-red-500 text-white";
    } else {
      return "bg-gray-200";
    }
  };

  return (
    <div className="px-10 container w-full text-sm sm:text-xl">
      {/* Display Original Text */}
      <div className="text-sm sm:text-xl">
        {text?.incorrect_text?.split(" ").map((word, index) => (
          <span
            key={index}
            className={`inline-block p-2 m-2 rounded ${highlightText(
              index,
              word
            )}`}
            onClick={() => handleClick(index)}
          >
            {word}{" "}
          </span>
        ))}
      </div>
      {/* Display clicked words */}
      <div className="container mt-4">
        <Dualdivs
          selectedText={selectedWords}
          correctionHandler={correctionHandler}
          resetHandler={divReset}
        />
        <CorrectedText
          words={storedCorrections}
          originalText={text?.incorrect_text || ""}
        />
      </div>

      <div className="w-full flex justify-between text-xs mt-4">
        <button
          className="flex items-center bg-blue-50 rounded-full text-blue-500 py-2 text-sm px-4"
          onClick={getOne}
        >
          Skip{" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
              fill="#2028F1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
              fill="#2028F1"
            />
          </svg>
        </button>
        <button
          className="flex items-center bg-blue-50 rounded-full text-blue-500 py-2 text-sm px-4"
          onClick={sendData}
        >
          Confirm all{" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
              fill="#2028F1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
              fill="#2028F1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TextSelection;
