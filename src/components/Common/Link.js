import React from "react";
import styled from "styled-components";

const Link = ({ link, label }) => (
  <LinkWrapper>
    <Href href={link}>{label}</Href>
  </LinkWrapper>
);

export default Link;

const LinkWrapper = styled.div`
  margin-bottom: 4px;
`;

const Href = styled.a`
  text-decoration: none;
  color: #6a1b9a;
  font-size: 15px;
  margin-left: 4px;
`;
