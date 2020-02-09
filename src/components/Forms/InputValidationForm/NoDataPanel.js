import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  ExpansionPanelContent,
  ExpansionPanelItem
} from "components/Common/styled";

const NoDataPanel = ({ title, description, children }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <ExpansionPanelItem>{title}</ExpansionPanelItem>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <ExpansionPanelContent>
        {description}
        {children}
      </ExpansionPanelContent>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default NoDataPanel;
