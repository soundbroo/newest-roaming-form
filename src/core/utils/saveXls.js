import XLSX from "xlsx";
import saveAs from "file-saver";

const saveXls = (
  filesToReload,
  setFilesToReload,
  agentFileName,
  header,
  values,
  fileSaverSwitcher,
  submitting
) => {
  const wb = XLSX.utils.book_new();
  wb.SheetNames.push("list");
  let data = [];

  values.forEach((value, index) => {
    data[index] = [
      value.name,
      value.inn,
      value.kpp,
      value.id,
      value.lastname,
      value.firstname,
      value.patronymic
    ];
  });

  data.unshift(header);
  console.log(data);
  const ws_data = data;
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["list"] = ws;
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const blob = new Blob([s2ab(wbout)], { type: "binary" });
  const blobFile = new File([blob], `${agentFileName}.xlsx`);
  console.log(agentFileName);
  console.log(blobFile);
  setFilesToReload({ ...filesToReload, [agentFileName]: blobFile });
  if (fileSaverSwitcher && submitting) {
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "test.xlsx"
    );
  }
};

export default saveXls;
