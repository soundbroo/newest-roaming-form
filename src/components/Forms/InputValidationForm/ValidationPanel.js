import React from "react";
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
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <ExpansionPanelItem>{agent.inn}</ExpansionPanelItem>
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
);

export default ValidationPanel;
