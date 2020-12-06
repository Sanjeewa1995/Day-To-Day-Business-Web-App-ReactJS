import React, { useEffect } from "react";

import Moment from "moment";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Card, Grid } from "@material-ui/core";

import classes from "./TodayCreditTable.module.css";

import * as getDataActions from "../../../store/actions/index";

const today = Moment(Date.now()).format("YYYY.MM.DD");

const TodayCreditTable = (props) => {
  const fetchData = () => {
    props.getCredit(today, props.url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let creditTable = null;

  if (props.todayCredit != null) {
    function createCreditData(name, value) {
      return { name, value };
    }

    const creditRows = props.todayCredit.map((credit) =>
      createCreditData(credit.Name, credit.Value)
    );

    creditTable = (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditRows.map((credit) => (
              <TableRow key={`${credit.name}${credit.value}`}>
                <TableCell component="th" scope="row">
                  {credit.name}
                </TableCell>
                <TableCell align="right">{credit.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      style={{ paddingTop: "50px", position: "relative", marginBottom: "20px" }}
    >
      <Card className={classes.card}>
        <Card className={classes.header}>
          <p className={classes.headerTitle}>Today Credit</p>
        </Card>
        <div className={classes.table}>{creditTable} </div>
      </Card>
    </Grid>
  );
};

const mapStateProps = (state) => {
  return {
    todayCredit: state.getData.todayCredit,
    error: state.getData.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCredit: (date, url) => dispatch(getDataActions.getTodayCredit(date, url)),
  };
};

export default connect(mapStateProps, mapDispatchToProps)(TodayCreditTable);
