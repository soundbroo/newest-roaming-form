import React from "react";
import styled from "styled-components";

const InvalidBrowser = ({ browser }) => (
  <Warning>
    <div>Браузер {browser} устарел.</div>
    <div>
      Вы пользуетесь устаревшим браузером, который не поддерживает современные
      веб-стандарты и представляет Угрозу вашей безопасности. Пожалуйста,
      установите современный браузер.
    </div>
  </Warning>
);

export default InvalidBrowser;

const Warning = styled.div`
  border: 1px solid #cecece;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 6px;
  padding: 12px;
  div {
    margin: 6px 0;
  }
`;
