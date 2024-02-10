import { dummyText } from "@/utils/data/dummyData";
import { CheckIcon, SkipForward } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import OutputDisplay2 from "./OutputDisplay2";
import WordButtons from "./WordButtons";
import WordEditFields, { FormSchema } from "./WordEditFields";
import { Database } from "@/utils/types/database";
import { cn } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";

type Props = {
  originalData: Database["public"]["Tables"]["sentences"]["Row"];
};

export function WordSelectionForm({ originalData }: Props) {
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
      originalData && originalData.incorrect_text
        ? originalData.incorrect_text.split(" ").slice(start, end + 1)
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
      return "shadow-md bg-green-50 text-green-600";
    } else if (
      selectedWords?.includes(word) && selectedRange
        ? selectedRange.start <= index && selectedRange.end >= index
        : false
    ) {
      return "shadow-md bg-red-50 text-red-500";
    } else {
      return "";
    }
  };

  const divReset = () => {
    setSelectedRange(undefined);
    setSelectedWords([]);
  };

  const resetHandler = () => {
    divReset();
    setStoredCorrections([]);
  };

  const correctionHandler = ({
    values,
  }: {
    values: z.infer<typeof FormSchema>;
  }) => {
    if (selectedRange) {
      setStoredCorrections((prevSelectedRange) => {
        return [
          ...prevSelectedRange,
          {
            ...values,
            incorrectText: selectedWords.join(" "),
            correctedText: values.correction,
            startIndex: selectedRange?.start,
            endIndex: selectedRange?.end,
          },
        ];
      });
      divReset();
    }

    console.log("storedCorrection", storedCorrections);
  };
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>
          Annotate this sentence. Try to find out grammatical erros, puncuation
          error etc
        </CardTitle>
        <CardDescription>{originalData.incorrect_text}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {originalData && (
          <WordButtons
            text={originalData.incorrect_text}
            highlightText={highlightText}
            handleClick={handleClick}
            selectedWords={selectedWords}
          />
        )}
        {selectedWords.length > 0 ? (
          <WordEditFields
            selectedText={selectedWords}
            correctionHandler={correctionHandler}
          />
        ) : (
          <div className="animate-pulse">
            <p className="text-muted-foreground">
              Editor will appear here when you select a word or phrase.
            </p>
            <div className="rounded bg-gray-300 h-6 w-1/2 mb-4"></div>
            <div className="rounded bg-gray-300 h-6 w-1/3 mb-4"></div>
            {/* <div className="rounded bg-gray-300 h-6 w-1/3 mb-4"></div> */}
            <div className="rounded bg-gray-300 h-6 w-1/12"></div>
          </div>
        )}

        <OutputDisplay2
          storedCorrections={storedCorrections}
          originalText={originalData?.incorrect_text || ""}
        />
        {/* ---Stroed corrections---
        <pre>{JSON.stringify(storedCorrections, null, 2)}</pre>
        ---selected words---
        <pre>{JSON.stringify(selectedWords, null, 2)}</pre>
        ---selected range---
        <pre>{JSON.stringify(selectedRange, null, 2)}</pre> */}
      </CardContent>
      <CardFooter className="flex gap-12 justify-between">
        <Button className="w-full" variant="secondary">
          <SkipForward className="mr-2 h-4 w-4" /> Skip
        </Button>
        <Button className="w-full" variant="destructive">
          <ResetIcon className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
