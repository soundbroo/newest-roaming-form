import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const SelectedFileChip = ({
  label,
  name,
  files,
  setFiles,
  setFilesToReload,
  formApi,
  setResponse,
  setValidationErrors
}) => {
  const handleDelete = () => {
    setFiles({ ...files, [name]: null });
    setFilesToReload({ sender_list: null, receiver_list: null });
    setResponse(null);
    setValidationErrors({});
    formApi.change(name, undefined);
  };

  return (
    <FileChip icon={<AttachFileIcon />} label={label} onDelete={handleDelete} />
  );
};

export default SelectedFileChip;

const FileChip = styled(Chip)`
  margin-right: 12px;
  max-width: 150px;
`;
