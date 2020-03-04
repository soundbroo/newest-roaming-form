import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useDropzone } from "react-dropzone";

import { statuses } from "constants";

import readXls from "utils/readXls";

import {
  AGREEMENT_LOADED_TITLE,
  AVAILABLE_FILE_EXTENSIONS,
  MESSAGES
} from "constants";

const UploadButtonAdapter = ({
  values,
  snackbarProps: { showSnackbar },
  files,
  setFiles,
  setContent,
  formApi,
  closeModal,
  title,
  input: { value, onChange, name, ...input }
}) => {
  const handleChange = uploaded => {
    const list = name === "sender_list" || name === "receiver_list";
    if (!uploaded.length) {
      list && closeModal();
      showSnackbar(MESSAGES.fileNotSupported, statuses.error, true, null);
      return;
    }

    const file = uploaded[0];
    const fileName = file.name.split(".");
    const extension = fileName[fileName.length - 1];
    const changeFileState = () => {
      onChange(file);
      setFiles({ ...files, [name]: file.name });
    };

    if (list && AVAILABLE_FILE_EXTENSIONS.list.includes(extension)) {
      changeFileState();
      formApi.change(name?.split("_")[0], [null]);
      closeModal();
      readXls({ file, setContent });
    } else if (
      name === "agreement" &&
      AVAILABLE_FILE_EXTENSIONS.agreement.includes(extension)
    ) {
      changeFileState();
    }
  };

  const onDrop = useCallback(acceptedFiles => handleChange(acceptedFiles), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: name === "agreement" ? ".pdf, .png" : ".xls, .xlsx"
  });

  return (
    <UploadButton
      key={name}
      {...getRootProps({
        onClick: e => e.stopPropagation()
      })}
    >
      <input
        {...getInputProps()}
        name={name}
        style={{ display: "none" }}
        id="upload-button"
        type="file"
      />
      <label htmlFor="upload-button">
        <Button key={name} variant="outlined" color="primary" component="span">
          <LabelWrapper>
            <div>
              {!isDragActive
                ? name === "agreement" && values.agreement
                  ? AGREEMENT_LOADED_TITLE
                  : title
                : "Перетащите файл сюда"}
            </div>
            <DragLabel>
              Перетащите файл сюда или нажмите, чтобы выбрать
              {name === "agreement" ? " (.pdf, .png)" : " (.xls, .xlsx)"}
            </DragLabel>
          </LabelWrapper>
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
  & > label > span > span:first-child {
    height: 60px;
    border-style: dashed;
    border-width: 1px;
    border-color: #5400a25c;
    border-radius: 6px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const DragLabel = styled.div`
  font-size: 10px;
`;
