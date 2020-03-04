import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const DownloadButton = ({ handleChange, link }) => (
  <Button
    variant="outlined"
    color="primary"
    startIcon={<AttachFileIcon />}
    onClick={handleChange}
  >
    <Link href={link}>Загрузить шаблон</Link>
  </Button>
);

export default DownloadButton;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
