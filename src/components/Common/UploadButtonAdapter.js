import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import readXlsxFile from "read-excel-file";

import { AGREEMENT_LOADED_TITLE } from "constants";

const UploadButtonAdapter = ({
  values,
  files,
  setFiles,
  setContent,
  formApi,
  closeModal,
  title,
  input: { value, onChange, name, ...input }
}) => {
  const handleChange = e => {
    onChange(e.target.files[0]);
    if (name !== "agreement") {
      setFiles({ ...files, [name]: e.target.files[0].name });
      formApi.change(name?.split("_")[0], [null]);
      closeModal();
      readXlsxFile(e.target.files[0]).then(rows => setContent(rows));
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
