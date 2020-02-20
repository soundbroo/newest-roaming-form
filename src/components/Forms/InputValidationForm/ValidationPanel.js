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

const ValidationPanel = ({ agent }) => (
  <ValidationPanelWrapper>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <ExpansionPanelItem>{agent?.inn}</ExpansionPanelItem>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ExpansionPanelContent>
          {Object.entries(agent).map(([key, value]) => {
            return (
              <>
                <ExpansionPanelItem>
                  <span>{TITLES_FOR_KEYS[key]}:</span> <span>{value}</span>
                </ExpansionPanelItem>
                <Divider />
              </>
            );
          })}
        </ExpansionPanelContent>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </ValidationPanelWrapper>
);

export default ValidationPanel;

const ValidationPanelWrapper = styled.div`
  margin: 12px 0 12px 0;
`;
