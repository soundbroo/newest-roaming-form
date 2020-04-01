import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => (
  <Loading>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Loading>
);

export default Loader;

const progress = keyframes`
  from {
    opacity: 1;
    }
    to {
      opacity: 0.5;
    }
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 25%;
  margin-right: 48px;

  div {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${p => p.theme.palette.primary};
    animation: ${progress} 1.2s linear infinite;
  }
  div:nth-child(1) {
    top: 8px;
    left: 0;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 8px;
    left: 48px;
    animation-delay: -0.4s;
  }
  div:nth-child(3) {
    top: 8px;
    left: 96px;
    animation-delay: -0.8s;
  }
  div:nth-child(4) {
    top: 56px;
    left: 0;
    animation-delay: -0.4s;
  }
  div:nth-child(5) {
    top: 56px;
    left: 48px;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    top: 56px;
    left: 96px;
    animation-delay: -1.2s;
  }
  div:nth-child(7) {
    top: 106px;
    left: 0;
    animation-delay: -0.8s;
  }
  div:nth-child(8) {
    top: 106px;
    left: 48px;
    animation-delay: -1.2s;
  }
  div:nth-child(9) {
    top: 106px;
    left: 96px;
    animation-delay: -1.6s;
  }
`;
