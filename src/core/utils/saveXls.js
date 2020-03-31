import XLSX from "xlsx";
import saveAs from "file-saver";

import { ASTRAL_ID } from "constants";

const saveXls = (
  filesToReload,
  setFilesToReload,
  agent,
  agentFileName,
  header,
  values,
  fileSaverSwitcher,
  submitting,
  response,
  activePage
) => {
  const type = "list";
  const wb = XLSX.utils.book_new();
  wb.SheetNames.push(type);
  let data = [];

  const id = value => {
    const prefix = value?.slice(0, 3);

    switch (activePage) {
      case 0: {
        if (agent === "sender" && value?.length === 36 && prefix !== ASTRAL_ID)
          return `${ASTRAL_ID}${value}`;
        if (agent === "receiver") return value;
        return value;
      }
      case 1: {
        const operator = localStorage.getItem("operator");
        if (agent === "sender" && value?.length < 44 && prefix !== operator) {
          return `${operator}${value}`;
        }
        if (agent === "receiver") {
          if (value?.length === 36 && prefix !== ASTRAL_ID) {
            return `${ASTRAL_ID}${value}`;
          }
        }
        return value;
      }
    }
  };

  values.forEach((value, index) => {
    const idValue = id(value.id);
    data[index] = [
      value.name,
      value.inn,
      value.kpp,
      idValue,
      value.lastname,
      value.firstname,
      value.patronymic
    ];
  });

  data.unshift(header);
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
  setFilesToReload({ ...filesToReload, [agentFileName]: blobFile });
  if (fileSaverSwitcher && response?.data?.status === 0) {
    setTimeout(
      () =>
        saveAs(
          new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
          `${agentFileName}.xlsx`
        ),
      0
    );
  }
};

export default saveXls;
