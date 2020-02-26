import styled from "styled-components";

export const FormFieldsRow = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 12px;
`;

export const ExpansionPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ExpansionPanelItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 36px;
`;

export const Divider = styled.hr`
  width: 100%;
  background: #eee;
  height: 1px;
  border: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 360px;
  width: 100%;
  padding: 16px;
  margin: 20px 0 0 0;
  overflow-y: overlay;
  border-top: thin solid #cecece3b;
  border-bottom: thin solid #cecece3b;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
  }
`;
