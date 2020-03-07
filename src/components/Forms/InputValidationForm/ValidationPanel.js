import React from "react";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import InputField from "components/Fields/InputField";
import {
  ExpansionPanelContent,
  ExpansionPanelItem,
  Divider
} from "components/Common/styled";

import { TITLES_FOR_KEYS } from "constants";

const ValidationPanel = ({
  agent,
  agentIndex,
  name,
  isFile,
  notification,
  data,
  isResponse,
  responseText,
  responseErrors
}) => {
  const prepareErrors = () => {
    let errors = {};
    for (let key in responseErrors) {
      if (key !== "files") {
        errors[key] = responseErrors[key];
      } else {
        for (let key in responseErrors.files) {
          errors[key] = responseErrors.files[key];
        }
      }
    }
    return errors;
  };

  const errors = prepareErrors();

  const renderTitle = () => (
    <TitleWrapper>
      <Title>
        {data?.name ||
          `${data?.lastname} ${data?.firstname} ${data?.patronymic || ""}`}
      </Title>
      {!notification &&
      errors &&
      Object.values(errors).some(el => el !== "") ? (
        <TitleError>{responseText || "Исправьте ошибки"}</TitleError>
      ) : null}
    </TitleWrapper>
  );

  return (
    <ValidationPanelWrapper>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <ExpansionPanelTitle>{renderTitle()}</ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ExpansionPanelContent>
            {Object.entries(data).map(
              ([key, value], index) =>
                (value || errors?.[key]) && (
                  <>
                    <ExpansionPanelItem key={index}>
                      <ItemWrapper>
                        <Item isFile={isFile}>
                          <InputField
                            name={
                              isResponse && isFile
                                ? `${name}[${agentIndex}]`
                                : `${agent}[${agentIndex}]`
                            }
                            fieldType={[key]}
                            variant="outlined"
                            size="small"
                          />
                        </Item>
                        <Error>
                          {(!notification && errors?.[key]) || null}
                        </Error>
                      </ItemWrapper>
                    </ExpansionPanelItem>
                    <Divider />
                  </>
                )
            )}
          </ExpansionPanelContent>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {errors?.agreement ? (
        <Error>{(!notification && errors?.agreement) || null}</Error>
      ) : null}
    </ValidationPanelWrapper>
  );
};

export default ValidationPanel;

const ExpansionPanelTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 38px;
`;

const ValidationPanelWrapper = styled.div`
  margin: 9px 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const TitleError = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  color: #fe4733;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 280px;
  text-align: right;
`;

const Errors = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${p => (p.isFile ? "flex-start" : "flex-end")};
  flex: 65%;
  ${p => !p.isResponse && "position: absolute"};
  top: 10px;
  width: 334px;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #fe4733;
  flex: 35%;
  ${p => !p.isResponse && "position: absolute"};
  height: 40px;
  width: 200px;
  right: 0px;
  top: 10px;
`;
