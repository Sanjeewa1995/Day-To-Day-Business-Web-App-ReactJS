import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import wijayaLogo from "../../../assets/wijaya-logo.jpg";
import { Grid, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  wijayaImage: {
    width: "20em",
    height: '14em',
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "10em",
      height: '10em'
    },
  },
  mainContainer: {
    position: "absolute",
  },
  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  gridItem: {
    margin: "3em",
    [theme.breakpoints.down("md")]: {
        margin: '2.3em'
      },
    [theme.breakpoints.down("sm")]: {
        margin: '1em'
      },
  },
}));

const Footer = (props) => {
  const classes = useStyle();

  return (
    <footer className={classes.footer}>
        <Hidden smDown>
      <Grid container justify="flex-end" className={classes.mainContainer}>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/"
              className={classes.link}
              onClick={() => props.setValue(0)}
            >
              Home
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/summery"
              className={classes.link}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(0);
              }}
            >
              Summery
            </Grid>
            <Grid
              item
              component={Link}
              to="/day-wise"
              className={classes.link}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(1);
              }}
            >
              Day Wise
            </Grid>
            <Grid
              item
              component={Link}
              to="/month-wise"
              className={classes.link}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(2);
              }}
            >
              Month Wise
            </Grid>
            <Grid
              item
              component={Link}
              to="/year-wise"
              className={classes.link}
              onClick={() => {
                props.setValue(1);
                props.setSelectedIndex(3);
              }}
            >
              Year Wise
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              component={Link}
              to="/cheque"
              item
              className={classes.link}
              onClick={() => props.setValue(2)}
            >
              Cheque
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/credit"
              className={classes.link}
              onClick={() => props.setValue(3)}
            >
              Credit
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              to="/company-cheque"
              className={classes.link}
              onClick={() => props.setValue(4)}
            >
              Company Cheque
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Hidden>
      <img src={wijayaLogo} alt="wijaya" className={classes.wijayaImage} />
    </footer>
  );
};

export default Footer;
