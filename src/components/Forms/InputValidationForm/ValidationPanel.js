import React from "react";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  ExpansionPanelContent,
  ExpansionPanelItem,
  Divider
} from "components/Common/styled";

import { TITLES_FOR_KEYS } from "constants";

const ValidationPanel = ({ agent, notification, data, responseErrors }) => {
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
    <>
      <span>
        {data?.name ||
          `${data?.lastname} ${data?.firstname} ${data?.patronymic || ""}`}
      </span>
      {!notification &&
      errors &&
      Object.values(errors).some(el => el !== "") ? (
        <Error>Исправьте ошибки</Error>
      ) : null}
    </>
  );

  return (
    <ValidationPanelWrapper>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <ExpansionPanelTitle>{renderTitle()}</ExpansionPanelTitle>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ExpansionPanelContent>
            {Object.entries(data).map(([key, value], index) => {
              return (
                value && (
                  <>
                    <ExpansionPanelItem key={index}>
                      <ItemWrapper>
                        <Title>{TITLES_FOR_KEYS[key]}:</Title>{" "}
                        <Item error={Boolean(errors?.[key])}>
                          <span>{value}</span>
                          <Error>
                            {(!notification && errors?.[key]) || null}
                          </Error>
                        </Item>
                      </ItemWrapper>
                    </ExpansionPanelItem>
                    <Divider />
                  </>
                )
              );
            })}
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
`;

const ValidationPanelWrapper = styled.div`
  margin: 9px 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  ${p => p.error && "font-size: 15px"}
`;

const Error = styled.div`
  font-size: 13px;
  color: #fe4733;
`;
