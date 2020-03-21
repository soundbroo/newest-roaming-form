import React from "react";
import styled from "styled-components";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card,
  CardContent
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import InputField from "components/Fields/InputField";
import ErrorTooltipIcon from "components/Common/ErrorTooltipIcon";
import {
  ExpansionPanelContent,
  ExpansionPanelItem,
  Divider,
  TitleError
} from "components/Common/styled";

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
    const renderTitleName = () => {
      const title = (() => {
        if (data?.name) return data.name;
        if (data?.lastname || data?.firstname || data?.patronymic)
          return `${data?.lastname} ${data?.firstname} ${data?.patronymic}`;
        return "Заполните название организации или ФИО";
      })();
      return <Title>{title}</Title>;
    };

    const renderTitleError = () => {
      if (
        !notification &&
        errors &&
        Object.values(errors).some(el => el !== "")
      ) {
        if (responseText) {
          return <ErrorTooltipIcon responseText={responseText} />;
        }
        if (errors.operator) {
          return <ErrorTooltipIcon responseText={errors.operator} />;
        }
        return <ErrorTooltipIcon invisible={true} />;
      }
      if (responseText) {
        return <ErrorTooltipIcon responseText={responseText} />;
      }
      if (processed) {
        return (
          <TitleError>
            <CheckIcon />
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
        <ExpansionPanelSummary>
          <PanelTitle>{renderTitle()}</PanelTitle>
        </ExpansionPanelSummary>
        <PanelDetails>
          <ExpansionPanelContent>
            {Object.entries(data).map(
              ([key, value], index) =>
                (value || (value === "" && !isResponse) || errors?.[key]) && (
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
                            {(!notification && errors?.[key]) || null}
                          </Error>
                        )}
                      </ItemWrapper>
                    </ExpansionPanelItem>
                    <Divider />
                  </>
                )
            )}
          </ExpansionPanelContent>
        </PanelDetails>
      </ExpansionPanel>
      {errors?.agreement ? (
        <Error>{(!notification && errors?.agreement) || null}</Error>
      ) : null}
    </ValidationPanelWrapper>
  );
};

export default ValidationPanel;

const PanelTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PanelDetails = styled(ExpansionPanelDetails)`
  @media (max-width: 660px) {
    padding: 8px 12px !important;
  }
`;

const ValidationPanelWrapper = styled.div`
  margin: 9px 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 75px;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.div``;

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
  width: 100%;
  div {
    padding-right: 0;
  }

  @media (max-width: 660px) {
    width: 100%;
    div {
      padding: 0;
      label {
        margin-left: 0;
      }
    }
  }
`;

const Error = styled.div`
  font-size: 16px;
  z-index: 1;
  margin-top: 72px;
  margin-bottom: 8px;
  margin-left: 13px;
  color: ${p => p.theme.palette.validationError};

  @media (max-width: 660px) {
    right: -10px;
    top: 38px;
  }
`;
