import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";

const DownloadButton = ({ handleChange, link }) => (
  <Button
    variant="outlined"
    color="primary"
    startIcon={<GetAppIcon />}
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
