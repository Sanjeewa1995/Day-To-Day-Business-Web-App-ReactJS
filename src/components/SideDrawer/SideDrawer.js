import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import image from "../../assets/img/sidebar-2.jpg";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";

import { firebaseAuth } from "../../firebase";

import classes from "./SideDrawer.module.css";
import { Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    height: "100%",
    width: 260,
    [theme.breakpoints.up("md")]: {
      width: "260px",
      position: "fixed",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
    },
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: "#000",
      opacity: ".75",
    },
  },
}));

const SideDrawer = (props) => {
  const [activeItem, setActiveItem] = useState();

  const classes2 = useStyle();

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  let routes = props.routes;
  //routes.push(addUserItem);

  let links = (
    <List className={classes.List}>
      {routes.map((prop, key) => {
        let listItemClasses = classes.listItem;
        if (activeRoute(prop.layout + prop.path)) {
          listItemClasses = classes.activeListItem;
        }
        return (
          <NavLink
            onClick={setActiveItem}
            activeStyle={{ textDecoration: "none" }}
            to={prop.layout + prop.path}
            isActive={() => {
              return true;
            }}
            className={classes.navLink}
            activeClassName="active"
            key={key}
          >
            <ListItem
              button
              style={{ padding: "0px", margin: "0px 20px 20px 0px" }}
            >
              <div className={listItemClasses}>
                <Icon style={{ margin: "auto", color: "white" }}>
                  {<prop.icon />}
                </Icon>
                <ListItemText
                  className={classes.listItemText}
                  disableTypography={true}
                  primary={prop.name}
                ></ListItemText>
              </div>
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  let signOutButton = (
    <NavLink
      to={"/login"}
      activeStyle={{ textDecoration: "none" }}
      style={{ textDecoration: "none" }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => firebaseAuth.signOut()}
      >
        Log Out
      </Button>
    </NavLink>
  );

  return (
    <React.Fragment>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{ paper: classes2.drawerPaper }}
        >
          <div
            style={{
              display: "flex",
              zIndex: 4,
              position: "absolute",
              top: "30px",
              left: "15px",
              right: "15px",
              alignItems: "center",
              justifyContent: "left",
              paddingLeft: "13px",
            }}
          >
            <img
              src={props.companyLogo}
              alt="wijaya logo"
              className={classes.wijayaLogo}
            />
            <div className={classes.wijayaLogoText}>{props.companyName}</div>
          </div>
          <Divider
            absolute
            style={{
              zIndex: "4",
              background: "white",
              height: "1px",
              left: "15px",
              top: "90px",
              right: "15px",
              width: "auto",
              opacity: "0.3",
            }}
          />
          <div className={classes.SideDrawerWraper}>
            {links}
            {props.children}
            {signOutButton}
          </div>
          <div
            className={classes2.background}
            style={{
              backgroundImage: "url(" + image + ")",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default SideDrawer;
