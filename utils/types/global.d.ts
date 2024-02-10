type Index = {
  start: number;
  end: number;
  slicedText: string;
};

type StoredCorrections = {
  incorrectText: string;
  correctedText: string;
  startIndex: number;
  endIndex: number;
  grammar: string;
  punctuation: string;
  edit_type: string;
};
