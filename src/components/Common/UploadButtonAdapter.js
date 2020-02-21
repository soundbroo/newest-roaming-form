import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import readXlsxFile from "read-excel-file";

import { AGREEMENT_LOADED_TITLE, AVAILABLE_FILE_EXTENSIONS } from "constants";

const UploadButtonAdapter = ({
  values,
  messageState: { setMessage },
  openState: { setOpen },
  files,
  setFiles,
  setContent,
  formApi,
  closeModal,
  title,
  input: { value, onChange, name, ...input }
}) => {
  const handleChange = e => {
    const fileName = e.target.files[0].name.split(".");
    const extension = fileName[fileName.length - 1];
    if (
      (name === "sender_list" || name === "receiver_list") &&
      AVAILABLE_FILE_EXTENSIONS.list.includes(extension)
    ) {
      onChange(e.target.files[0]);
      setFiles({ ...files, [name]: e.target.files[0].name });
      formApi.change(name?.split("_")[0], [null]);
      closeModal();
      readXlsxFile(e.target.files[0]).then(rows => setContent(rows));
    } else if (
      name === "agreement" &&
      AVAILABLE_FILE_EXTENSIONS.agreement.includes(extension)
    ) {
      onChange(e.target.files[0]);
    } else {
      (name === "sender_list" || name === "receiver_list") && closeModal();
      setMessage("Отправка файлов данного типа не поддерживается");
      setOpen(true);
    }
  };

  return (
    <UploadButton key={name}>
      <input
        name={name}
        {...input}
        style={{ display: "none" }}
        accept=".xls, .xlsx, .pdf, .png"
        id="upload-button"
        type="file"
        onChange={e => handleChange(e)}
      />
      <label htmlFor="upload-button">
        <Button
          key={name}
          variant="outlined"
          color="primary"
          component="span"
          startIcon={<AttachFileIcon />}
        >
          {name === "agreement" && values.agreement
            ? AGREEMENT_LOADED_TITLE
            : title}
        </Button>
      </label>
    </UploadButton>
  );
};

export default UploadButtonAdapter;

const UploadButton = styled.div`
  & > label > span {
    width: 100%;
  }
`;
