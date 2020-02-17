import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const UploadButtonAdapter = ({
  name,
  setFileName,
  setIn,
  values,
  closeModal,
  title,
  input: { value, onChange, ...input }
}) => {
  const handleChange = e => {
    console.log(e.target.files[0]);
    onChange(e.target.files[0]);
    setFileName(e.target.files[0]);
    console.log(setIn);
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
