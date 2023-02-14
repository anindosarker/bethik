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
import { Database } from "../../supabase";
import { useRouter } from "next/router";

type SentenceType = Database["public"]["Tables"]["sentences"]["Row"][] | null;

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
    {
      incorrectText: string;
      correctedText: string;
      start: number;
      end: number;
    }[]
  >([]);

  //TODO: queries
  //get one sentence from the database
  const supabase = useSupabaseClient();
  const [text, setText] = useState<string | null>("");
  const [oneData, setOneData] = useState<SentenceType | null>([]);

  const getOne = async () => {
    try {
      let getOneData: SentenceType = null;

      const { data, error } = await supabase
        .from("sentences")
        .select("*")
        .limit(1)
        .eq("is_checked", false);

      getOneData = data;

      setText(getOneData[0].incorrect_text);
      setOneData(getOneData[0]);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    
    getOne();
  }, []);

  //function to send data to the backend
  const sendData = async () => {
    try {
      const { data: updateOneData, error } = await supabase
        .from("sentences")
        .update({
          incorrect_text: text,
          correct_text: newTextHandler(storedCorrections, text).newText,
          is_checked: true,
          index: storedCorrections,
          email: session?.user?.email,
        })
        .eq("id", oneData.id);

        router.reload();
    } catch (error) {
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
    setSelectedWords(text.split(" ").slice(start, end + 1));
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
    <div className="flex flex-col items-center px-10">
      {/* Display Original Text */}
      <div className="text-xl">
        {text.split(" ").map((word, index) => (
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
        <CorrectedText words={storedCorrections} originalText={text} />
      </div>

      <div className="text-xs mt-4">
        <button
          className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4"
          onClick={sendData}
        >
          Send{" "}
        </button>

        <pre>{JSON.stringify(storedCorrections, null, 2)}</pre>
      </div>
    </div>
  );
}

export default TextSelection;
