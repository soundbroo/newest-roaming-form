import XLSX from "xlsx";

import saveXls from "utils/saveXls";

import {
  MAX_NUMBER_OF_FORMS,
  MESSAGES,
  TEMPLATE_KEYS,
  statuses
} from "constants";

import setIdPrefix from "utils/autoPrefixer";

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
  setFilesToReload,
  loading,
  setLoading
}) => {
  setLoading(true);
  const reader = new FileReader();

  reader.onload = e => {
    const wb = XLSX.read(e.target.result, {
      type: "binary",
      bookVBA: true
    });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const wsData = XLSX.utils.sheet_to_json(ws);

    const showError = message => {
      showSnackbar(message, statuses.error, true, null);
      return setLoading(false);
    };

    if (wsData.length === 0) {
      return showError(MESSAGES.emptyXlsx);
    }

    // Добавляем префиксы, которые будут отрендерены при загрузке xlsx
    const data = wsData.map(row => {
      if (row["ИД ЭДО"]) {
        return {
          ...row,
          ["ИД ЭДО"]: setIdPrefix(row["ИД ЭДО"], agent, activePage)
        };
      }
      return row;
    });

    // Готовим объект для перезаписи xlsx, чтобы при первой
    // отправке добавленные префиксы отправились в измененном xlsx
    const xls = data.map(el => {
      const {
        name,
        inn,
        kpp,
        id,
        lastname,
        firstname,
        patronymic
      } = TEMPLATE_KEYS;
      let newEl = {};
      for (let key in el) {
        switch (key) {
          case name:
            newEl.name = el[name];
          case inn:
            newEl.inn = el[inn];
          case kpp:
            newEl.kpp = el[kpp];
          case id:
            newEl.id = el[id];
          case lastname:
            newEl.lastname = el[lastname];
          case firstname:
            newEl.firstname = el[firstname];
          case patronymic:
            newEl.patronymic = el[patronymic];
        }
        return newEl;
      }
    });

    if (xls.some(el => Object.keys(el).length === 0)) {
      return showError(MESSAGES.invalidXlsx);
    }

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
    setLoading(false);
  };

  reader.readAsBinaryString(file);
};

export default readXls;
