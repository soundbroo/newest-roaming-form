import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const UploadButtonAdapter = ({
  files,
  setFiles,
  closeModal,
  title,
  input: { value, onChange, ...input }
}) => {
  const handleChange = e => {
    onChange(e.target.files[0]);
    setFiles({ ...files, [input.name]: e.target.files[0].name });
    closeModal();
  };

  return (
    <UploadButton>
      <input
        name={name}
        {...input}
        style={{ display: "none" }}
        accept="*"
        id="upload-button"
        type="file"
        onChange={e => handleChange(e)}
      />
      <label htmlFor="upload-button">
        <Button
          variant="outlined"
          color="primary"
          component="span"
          startIcon={<AttachFileIcon />}
        >
          {title}
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
