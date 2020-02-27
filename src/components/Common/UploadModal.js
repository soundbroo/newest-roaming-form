import React, { useState } from "react";
import styled from "styled-components";
import { Button, Chip } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { Background } from "components/Common/styled";
import UploadField from "components/Forms/UploadField";

import { UPLOAD_MODAL_CONTENT, BUTTON_TITLES } from "constants";

const UploadModal = ({ handleChange, ...rest }) => (
  <Background onClick={handleChange}>
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
  </Background>
);

const OpenModalButton = ({ name, files, ...rest }) => {
  const [isModal, setIsModal] = useState(false);

  const handleChange = () => setIsModal(!isModal);

  return (
    <>
      {isModal ? (
        <UploadModal
          name={name}
          handleChange={handleChange}
          files={files}
          {...rest}
        />
      ) : null}
      {!files[name] ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AttachFileIcon />}
          onClick={handleChange}
        >
          Прикрепить список
        </Button>
      ) : (
        <SelectedFileButton
          name={name}
          label={files[name]}
          files={files}
          {...rest}
        />
      )}
    </>
  );
};

const SelectedFileButton = ({ label, name, files, setFiles, formApi }) => {
  const handleDelete = () => {
    setFiles({ ...files, [name]: null });
    formApi.change(name, undefined);
  };

  return (
    <Chip
      icon={<AttachFileIcon />}
      label={label}
      // onClick={handleClick}
      onDelete={handleDelete}
    />
  );
};

export default OpenModalButton;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 480px;
  height: 310px;
  border-radius: 3px;
  padding: 12px;
  left: calc(50% - 240px);
  top: calc(50% - 160px);
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
