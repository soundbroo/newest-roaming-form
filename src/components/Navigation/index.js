import React from "react";
import styled from "styled-components";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ToolTip from "@material-ui/core/ToolTip";

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 10,
    marginLeft: -19
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    paddingTop: 64
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 64,
    paddingTop: 64
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1
  },
  navIcon: {
    fontSize: 32
  }
}));

const Navigation = ({ activePage, setActivePage, children }) => {
  const handleClick = index => {
    setActivePage(index);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const setDrawer = () => {
    setOpen(!open);
  };

  const setIcon = index => {
    switch (index) {
      case 0:
        return (
          <Person
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 1:
        return (
          <Business
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 2:
        return (
          <SignalCellularAlt
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 3:
        return (
          <AssignmentIndIcon
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
      case 4:
        return (
          <ListAltIcon
            color={activePage === index ? "primary" : "disabled"}
            className={classes.navIcon}
          />
        );
    }
  };

  return (
    <NavigationWrapper>
      <AppBar position="fixed" className={classes.appBar}>
        <NavBar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={setDrawer}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Title>Астрал.Роуминг ЭДО</Title>
        </NavBar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <List>
          {[
            "Клиентам",
            "Операторам",
            "Статус заявления",
            "Состояние роуминга",
            "Проверка контрагентов"
          ].map((text, index) => {
            const Item = () => (
              <ToolTip title={!open ? text : ""}>
                <ListItem button key={text} onClick={() => handleClick(index)}>
                  <ListItemIcon>{setIcon(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </ToolTip>
            );
            return <Item />;
          })}
        </List>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 5;
  overflow-x: hidden;
  @media (max-width: 660px) {
  }
`;

const NavBar = styled(Toolbar)`
  min-height: 56px;
  @media (max-width: 660px) {
    min-height: 48px;
  }
`;

const Title = styled.span`
  font-size: 20px;
`;
