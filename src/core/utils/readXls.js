import XLSX from "xlsx";

import saveXls from "utils/saveXls";

import { MAX_NUMBER_OF_FORMS, MESSAGES, statuses } from "constants";

import { ASTRAL_ID } from "constants";
const readXls = ({
  file,
  name,
  content,
  setContent,
  showSnackbar,
  setXls,
  activePage,
  agent,
  filesToReload,
  setFilesToReload
}) => {
  const reader = new FileReader();

  reader.onload = e => {
    const wb = XLSX.read(e.target.result, {
      type: "binary",
      bookVBA: true
    });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const wsData = XLSX.utils.sheet_to_json(ws);

    const id = value => {
      const prefix = value?.slice(0, 3);

      switch (activePage) {
        case 0: {
          if (agent === "sender" && value.length === 36 && prefix !== ASTRAL_ID)
            return `${ASTRAL_ID}${value}`;
          if (agent === "receiver") return value;
          return value;
        }
        case 1: {
          const operator = localStorage.getItem("operator");
          if (agent === "sender" && value.length < 44 && prefix !== operator) {
            return `${operator}${value}`;
          }
          if (agent === "receiver") {
            if (value.length === 36 && prefix !== ASTRAL_ID) {
              return `${ASTRAL_ID}${value}`;
            }
          }
          return value;
        }
      }
    };

    const data = wsData.map(row => {
      if (row["ИД ЭДО"]) {
        return { ...row, ["ИД ЭДО"]: id(row["ИД ЭДО"]) };
      }
      return row;
    });

    const xls = data.map(el => {
      let newEl = {};
      for (let key in el) {
        switch (key) {
          case "Краткое наименование организации":
            newEl.name = el["Краткое наименование организации"];
          case "ИНН":
            newEl.inn = el["ИНН"];
          case "КПП":
            newEl.kpp = el["КПП"];
          case "ИД ЭДО":
            newEl.id = el["ИД ЭДО"];
          case "Фамилия":
            newEl.lastname = el["Фамилия"];
          case "Имя":
            newEl.firstname = el["Имя"];
          case "Отчество":
            newEl.patronymic = el["Отчество"];
        }
        return newEl;
      }
    });

    const agentFileName = `${agent}_list`;

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

    saveXls(
      filesToReload,
      setFilesToReload,
      agent,
      agentFileName,
      dataHeader(),
      xls,
      false,
      false,
      false,
      activePage
    );

    if (data.length > MAX_NUMBER_OF_FORMS) {
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
