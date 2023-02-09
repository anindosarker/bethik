import React, { useState } from "react";

type Props = {
  divRender: any;
};


const text =
  "আমার দেশের নাম, তুমি কি জানো? ২০১৪ সালের ৫ই জানুয়ারির আগ পর্যন্ত তাই ছিল অঘোষিত নিয়ম। মুসলমানরা তিনটি প্রদেশে সংখ্যাগরিষ্ঠ হলেও সামগ্রিকভাবে ভারতে তারা সংখ্যালঘু।";



function CorrectedText({ divRender }: Props) {
   const [updatedText, setUpdatedText] = useState(text);

   const updateText = (updatedArray: any[]) => {
     let newText = text;
     updatedArray.forEach((item) => {
       newText =
         newText.slice(0, item.start) +
         item.correctedText +
         newText.slice(item.end);
     });
     setUpdatedText(newText);
     console.log('======NewTest==============================');
     console.log(newText);
     console.log('====================================');
   };
  return (
    <div>
      CorrectedText Component
      {divRender.slice(1).map((item: any, index: number) => {
        return (
          <div key={index}>
            {item.slicedText}
            {index}

         
          </div>
        );
      })
      }

    </div>
  );
}

export default CorrectedText;
