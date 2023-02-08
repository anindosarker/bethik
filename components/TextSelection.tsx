import React from "react";


const text =
  "আমার দেশের নাম, তুমি কি জানো? ২০১৪ সালের ৫ই জানুয়ারির আগ পর্যন্ত তাই ছিল অঘোষিত নিয়ম। মুসলমানরা তিনটি প্রদেশে সংখ্যাগরিষ্ঠ হলেও সামগ্রিকভাবে ভারতে তারা সংখ্যালঘু।";


function TextSelection() {
  return (
    <div>
      {text.split(" ").map((word, index) => (
        <span key={index}>{word} </span>
      ))}

      {/* Display clicked words */}
      <div>
        
      </div>
    </div>
  );
}

export default TextSelection;
