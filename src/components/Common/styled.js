import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const StyledFormFieldsWrapper = styled(Paper)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 18px 0 9px 0;
  padding: 9px 0;
  &:first-child {
    margin-top: 0;
  }
`;

export const FormFieldsRow = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
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
  height: 72px;
`;

export const Divider = styled.hr`
  width: 100%;
  background: #eee;
  height: 1px;
  margin: 0;
  border: none;
  &:last-child {
    height: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 460px;
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

export const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 6px 18px;
  margin: 20px 0 0 0;
  &:first-child {
    margin: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  min-height: 21px;
  justify-content: space-between;
  align-items: center;
  border-bottom: thin solid #cecece3b;
  padding: 6px;
  &:last-child {
    border: none;
  }
`;
export const Cell = styled.div`
  display: flex;
  align-items: center;
`;

export const Background = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
