import React from "react";

type Props = {
    text: string;
    indexArray: any;
}


function CorrectedText({text, indexArray}:Props) {
  return <div>
        {
            //show the indexArray
            indexArray.map((item:any, index:number) => {
                return <div key={index}>
                    {text.slice(0, item.start)}
                    <span className="bg-red-500 text-white">
                        {text.slice(item.start, item.end)}
                    </span>
                    {text.slice(item.end)}
                </div>
            })
        }
  </div>;
}

export default CorrectedText;
