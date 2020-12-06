import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import classes2 from "./Header.module.css";

import { wijayaRoutes } from "../../routes";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyle = makeStyles((theme) => ({
  appBar: {
    zIndex: "0",
    background: "linear-gradient(10deg, #5FE5BC 30%, #19769F 70%)",
    [theme.breakpoints.down("sm")]: {
      zIndex: theme.zIndex.modal + 1,
    },
    [theme.breakpoints.down("xs")]: {
      background: "#19769F",
      zIndex: theme.zIndex.modal + 1,
    },
  },
  toolbar: {
    height: "5em",
    [theme.breakpoints.down("sm")]: {
      height: "5.5em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "4.5em",
    },
  },
  toolbarMargine: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.97em",
    },
  },

  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
    color: "white",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemLogout: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    opacity: 1,
  },
}));

const Header = (props) => {
  const classes = useStyle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selected, newSelected] = useState("Dashboard");

  const Drawer = (
    <div>
      <SwipeableDrawer
        variant="persistent"
        anchor="left"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargine} />
        <List disablePadding>
          {wijayaRoutes.map((route) => {
            return (
              <ListItem
                key={route.name}
                onClick={() => {
                  setOpenDrawer(false);
                  newSelected(route.name);
                }}
                divider
                button
                component={Link}
                to={route.layout + route.path}
                selected={selected === route.name}
              >
                <ListItemText
                  className={
                    props.value === 0
                      ? classNames(
                          classes.drawerItemSelected,
                          classes.drawerItem
                        )
                      : classes.drawerItem
                  }
                  disableTypography
                >
                  {route.name}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </SwipeableDrawer>
    </div>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters className={classes2.toolBar}>
            {Drawer}
            <p className={classes2.appBarTitle}>{selected}</p>
            <div style={{ position: "absolute", right: "0px" }}>
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
                className={classes.drawerIconContainer}
              >
                <MenuIcon className={classes.drawerIcon} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargine} />
    </React.Fragment>
  );
};

export default Header;
