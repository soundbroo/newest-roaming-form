import XLSX from "xlsx";
import { MAX_NUMBER_OF_FORMS } from "constants";

import { MESSAGES, statuses } from "constants";

const readXls = ({ file, name, content, setContent, showSnackbar, setXls }) => {
  const reader = new FileReader();

  reader.onload = e => {
    const wb = XLSX.read(e.target.result, {
      type: "binary",
      bookVBA: true
    });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws);

    const dataHeader = () => {
      let header = [];
      for (let key in ws) {
        const row = key.slice(1);
        if (row === "1") {
          header.push(ws[key].v);
        }
      }
      return header;
    };

    if (data.length >= MAX_NUMBER_OF_FORMS) {
      showSnackbar(MESSAGES.extendedFormNumbers, statuses.error, true, null);
    } else {
      setContent({
        ...content,
        data: { ...content.data, [name]: data },
        header: dataHeader()
      });
      setXls();
    }
  };

  reader.readAsBinaryString(file);
};

export default readXls;
