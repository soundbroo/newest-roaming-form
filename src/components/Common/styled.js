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
  width: 100%;
  margin: 20px 0 0 0;
  overflow-y: auto;
  scrollbar-width: thin;

  @media (min-width: 660px) {
    height: calc(100vh - 400px);
    padding: 16px;
    border-top: thin solid #cecece3b;
    border-bottom: thin solid #cecece3b;
  }

  @media (max-width: 660px) {
    margin: 6px 0 0 0;
    height: calc(100vh - 342px);
    padding: 1px;
  }

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
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Background = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
`;

export const TitleError = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  color: ${p => p.theme.palette.error};
  max-width: 280px;
  min-width: fit-content;
  padding-right: 2px;
  text-align: right;
`;

export const Wrapper = styled(Paper)`
  max-width: 1000px;
  width: 100%;
  margin-bottom: 40px;
  padding: 12px;
  @media (max-width: 660px) {
    margin-bottom: 9px;
  }
`;
