import { useState } from "react";

const useFileContent = () => {
  const [content, setContent] = useState(null);

  return [content, setContent];
};

export default useFileContent;
