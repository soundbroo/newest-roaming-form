import XLSX from "xlsx";

const readXls = ({ file, name, content, setContent }) => {
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

    setContent({
      ...content,
      data: { ...content.data, [name]: data },
      header: dataHeader()
    });
  };

  reader.readAsBinaryString(file);
};

export default readXls;
