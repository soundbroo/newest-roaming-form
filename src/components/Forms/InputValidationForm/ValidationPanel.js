import React from "react";
import styled from "styled-components";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card,
  CardContent
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import InputField from "components/Fields/InputField";
import ErrorTooltipIcon from "components/Common/ErrorTooltipIcon";
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
  processed,
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

  const renderTitle = () => {
    const renderTitleName = () => (
      <Title>
        {data?.name ||
          `${data?.lastname} ${data?.firstname} ${data?.patronymic || ""}`}
      </Title>
    );

    const renderTitleError = () => {
      if (
        !notification &&
        errors &&
        Object.values(errors).some(el => el !== "")
      ) {
        if (responseText) {
          return (
            <TitleError>
              <ErrorTooltipIcon responseText={responseText} />
            </TitleError>
          );
        }
        return (
          <TitleError>
            <ErrorTooltipIcon invisible={true} />
          </TitleError>
        );
      }
      if (responseText) {
        return (
          <TitleError>
            <ErrorTooltipIcon responseText={responseText} />
          </TitleError>
        );
      }
      if (processed) {
        return (
          <TitleError>
            <CheckIcon color="primary" />
          </TitleError>
        );
      }
    };

    return (
      <TitleWrapper>
        {renderTitleName()}
        {renderTitleError()}
      </TitleWrapper>
    );
  };

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
                            disabled={!responseText && processed}
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
                        {!notification && errors?.[key] && (
                          <Error>
                            <Card>
                              <CardContent>
                                {(!notification && errors?.[key]) || null}
                              </CardContent>
                            </Card>
                          </Error>
                        )}
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
  color: ${p => p.theme.palette.error};
  max-width: 280px;
  min-width: fit-content;
  padding-right: 2px;
  text-align: right;
`;

const CheckIcon = styled(CheckCircleIcon)`
  color: ${p => `${p.theme.palette.success} !important`};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${p => (p.isFile ? "flex-start" : "flex-end")};
  position: absolute;
  top: 10px;
  width: 334px;

  @media (max-width: 660px) {
    width: calc(100% + 20px);
  }
`;

const Error = styled.div`
  font-size: 13px;
  position: absolute;
  height: 40px;
  width: 200px;
  right: 0px;
  top: 10px;

  @media (max-width: 660px) {
    right: -10px;
    top: 38px;
  }

  div {
    width: inherit;
    background: ${p => p.theme.palette.errorLight};
    color: #fff;
    div {
      min-height: 31px;
      max-height: 48px;
      padding: 4px;
      &:last-child {
        padding: 4px;
      }
    }
  }
`;
