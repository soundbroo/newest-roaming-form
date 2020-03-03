import React, { useState } from "react";
import styled from "styled-components";

import { Background } from "components/Common/styled";

const useModal = ({
  component: Component,
  setAuth,
  messageState,
  openState,
  colorState,
  refresh
}) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const Modal = () =>
    isModal ? (
      <Background>
        <ModalWrapper onClick={e => e.stopPropagation()}>
          <Component
            setAuth={setAuth}
            messageState={messageState}
            openState={openState}
            colorState={colorState}
            refresh={refresh}
            handleModal={handleModal}
          />
        </ModalWrapper>
      </Background>
    ) : null;

  return [Modal, isModal, setIsModal];
};

export default useModal;

const ModalWrapper = styled.div`
  position: fixed;
  left: calc(50% - 182px);
  top: calc(50% - 160px);
  z-index: 3;
`;
