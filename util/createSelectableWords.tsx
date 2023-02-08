function createSelectableWords(str) {
  let selectableWords = [];
  let currentWord = "";
  let currentIndex = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (
      char === " " ||
      char === "," ||
      char === "." ||
      char === "!" ||
      char === "?"
    ) {
      if (currentWord) {
        selectableWords.push({
          value: currentWord,
          startIndex: currentIndex,
          endIndex: i - 1,
        });
        currentWord = "";
        currentIndex = i + 1;
      }
      selectableWords.push({
        value: char,
        startIndex: i,
        endIndex: i,
      });
    } else {
      currentWord += char;
    }
  }

  if (currentWord) {
    selectableWords.push({
      value: currentWord,
      startIndex: currentIndex,
      endIndex: str.length - 1,
    });
  }

  return selectableWords;
}

export default createSelectableWords;