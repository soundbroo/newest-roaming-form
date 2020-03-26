import React from "react";
import styled from "styled-components";
import GetAppIcon from "@material-ui/icons/GetApp";

const Link = ({ link, label }) => (
  <LinkWrapper>
    <GetAppIcon color="primary" fontSize="default" />
    <Href href={link}>{label}</Href>
  </LinkWrapper>
);

export default Link;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Href = styled.a`
  text-decoration: none;
  color: ${p => p.theme.palette.primary};
  font-size: 17px;
`;
