import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import UploadField from "components/Forms/UploadField";

import { UPLOAD_MODAL_CONTENT } from "constants";

const UploadModal = ({ handleChange, name }) => (
  <BackGround onClick={handleChange}>
    <Wrapper onClick={e => e.stopPropagation()}>
      <Title>{UPLOAD_MODAL_CONTENT.title}</Title>

      <div>{UPLOAD_MODAL_CONTENT.info}</div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AttachFileIcon />}
        onClick={handleChange}
      >
        <Link href="https://astral.ru/roaming/tempalates/abonent-receiver.xlsx">
          Загрузить шаблон
        </Link>
      </Button>
      <Warning>{UPLOAD_MODAL_CONTENT.warning}</Warning>
      <UploadField name={name} />
    </Wrapper>
  </BackGround>
);

const OpenModalButton = ({ name }) => {
  const [isModal, setIsModal] = useState(false);

  const handleChange = () => setIsModal(!isModal);

  return (
    <>
      {isModal ? <UploadModal name={name} handleChange={handleChange} /> : null}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AttachFileIcon />}
        onClick={handleChange}
      >
        Прикрепить список
      </Button>
    </>
  );
};

export default OpenModalButton;

const BackGround = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 320px;
  height: 280px;
  border-radius: 6px;
  padding: 12px;
  left: calc(50% - 160px);
  top: calc(50% - 140px);
  z-index: 3;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Warning = styled.div`
  color: #fe4733;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
