import { Database } from "./supabase";

type Index = {
  start: number;
  end: number;
  slicedText: string;
};

type StoredCorrections = {
  incorrectText: string;
  correctedText: string;
  start: number;
  end: number;
};
type SentenceType = Database["public"]["Tables"]["sentences"]["Row"] | null;
