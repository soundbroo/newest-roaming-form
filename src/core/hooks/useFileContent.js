import { useState } from "react";

const useFileContent = () => {
  const [content, setContent] = useState({
    header: null,
    data: {
      sender_list: null,
      receiver_list: null
    }
  });

  return [content, setContent];
};

export default useFileContent;
