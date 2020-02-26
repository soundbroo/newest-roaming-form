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

const ValidationPanel = ({ agent, error, data, errors }) => {
  console.log("CLIENT", data);

  const renderTitle = () => (
    <Item>
      <span>
        {data?.name ||
          `${data?.lastname} ${data?.firstname} ${data?.patronymic || ""}`}
      </span>
      {!error && errors ? <Error>Исправьте ошибки</Error> : null}
    </Item>
  );

  return (
    <ValidationPanelWrapper>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <ExpansionPanelItem>{renderTitle()}</ExpansionPanelItem>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ExpansionPanelContent>
            {Object.entries(data).map(([key, value], index) => {
              return (
                value && (
                  <>
                    <ExpansionPanelItem key={index}>
                      <ItemWrapper>
                        <Item>
                          <span>{TITLES_FOR_KEYS[key]}:</span>{" "}
                          <span>{value}</span>
                        </Item>
                        <Error>{(!error && errors?.[key]) || null}</Error>
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
    </ValidationPanelWrapper>
  );
};

export default ValidationPanel;

const ValidationPanelWrapper = styled.div`
  margin: 12px 0 12px 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Error = styled.div`
  text-align: right;
  font-size: 12px;
  color: red;
`;
