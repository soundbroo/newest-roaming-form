import React, { useState } from "react";
import styled from "styled-components";

import { Background } from "components/Common/styled";

const useModal = ({
  component: Component,
  setAuth,
  snackbarProps,
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
            refresh={refresh}
            handleModal={handleModal}
            {...snackbarProps}
          />
        </ModalWrapper>
      </Background>
    ) : null;

  return [Modal, isModal, setIsModal];
};

export default useModal;

const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 3;
`;
