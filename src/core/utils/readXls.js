import XLSX from "xlsx";

const readXls = ({ file, setContent }) => {
  const reader = new FileReader();

  reader.onload = e => {
    const wb = XLSX.read(e.target.result, {
      type: "binary",
      bookVBA: true
    });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws);
    setContent(data);
  };

  reader.readAsBinaryString(file);
};

export default readXls;
