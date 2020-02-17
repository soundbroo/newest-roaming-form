import React, { useState } from "react";
import styled from "styled-components";
import { Button, Chip } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import UploadField from "components/Forms/UploadField";

import { UPLOAD_MODAL_CONTENT, BUTTON_TITLES } from "constants";

const UploadModal = ({ handleChange, ...rest }) => (
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
      <UploadField
        closeModal={handleChange}
        title={BUTTON_TITLES.pickFile}
        {...rest}
      />
    </Wrapper>
  </BackGround>
);

const OpenModalButton = ({ ...props }) => {
  const [isModal, setIsModal] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleChange = () => setIsModal(!isModal);

  return (
    <>
      {isModal ? (
        <UploadModal
          handleChange={handleChange}
          setFileName={setFileName}
          {...props}
        />
      ) : null}
      {!fileName ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AttachFileIcon />}
          onClick={handleChange}
        >
          Прикрепить список
        </Button>
      ) : (
        <SelectedFileButton label={fileName.name} />
      )}
    </>
  );
};

const SelectedFileButton = ({ label }) => (
  <Chip
    icon={<AttachFileIcon />}
    label={label}
    // onClick={handleClick}
    // onDelete={handleDelete}
  />
);

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
