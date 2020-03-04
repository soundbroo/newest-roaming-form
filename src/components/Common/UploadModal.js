import React, { useState } from "react";
import styled from "styled-components";
import { Button, Chip } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { Background, Divider } from "components/Common/styled";
import DownloadButton from "components/Common/DownloadButton";
import UploadField from "components/Forms/UploadField";

import { UPLOAD_MODAL_CONTENT, BUTTON_TITLES } from "constants";

import { ABONENT_LIST, OPERATOR_LIST } from "constants/links";

const UploadModal = ({ handleChange, activePage, ...rest }) => {
  const templateLink = activePage === 0 ? ABONENT_LIST : OPERATOR_LIST;

  return (
    <Background onClick={handleChange}>
      <Wrapper onClick={e => e.stopPropagation()}>
        <Title>{UPLOAD_MODAL_CONTENT.title}</Title>
        <Divider />
        <Content>
          <div>{UPLOAD_MODAL_CONTENT.info}</div>
          <DownloadButton handleChange={handleChange} link={templateLink} />
          <Warning>{UPLOAD_MODAL_CONTENT.warning}</Warning>
          <UploadField
            closeModal={handleChange}
            title={BUTTON_TITLES.pickFile}
            {...rest}
          />
        </Content>
      </Wrapper>
    </Background>
  );
};

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
      ) : null}
    </>
  );
};

export default OpenModalButton;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 512px;
  height: 340px;
  border-radius: 3px;
  left: calc(50% - 256px);
  top: calc(50% - 170px);
  z-index: 3;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 9px 24px 24px 24px;
  font-size: 16px;
`;

const Title = styled.div`
  font-size: 20px;
  padding: 12px 0 0 24px;
`;

const Warning = styled.div`
  color: #fe4733;
`;
