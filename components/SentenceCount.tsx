import React, { useState, useEffect } from "react";

type Props = {
  userId: string;
};

const SentenceCount: React.FC<Props> = ({ userId }) => {
  const [count, setCount] = useState(2);

  useEffect(() => {
    // Fetch the count of corrected sentences for the user from your database
    // and update the state using setCount
  }, [userId]);


  return (
    <div className="fixed top-0 right-0 bg-white rounded p-2 text-xs text-gray-800 shadow">
      <p className="font-medium">Total Sentences Corrected: {count}</p>
    </div>
  );
};

export default SentenceCount;
