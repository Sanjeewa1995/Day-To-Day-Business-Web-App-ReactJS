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

import classes from "./TodayChequeTable.module.css";

import * as getDataActions from "../../../store/actions/index";

const today = Moment(Date.now()).format("YYYY.MM.DD");

const TodayChequeTable = (props) => {
  const fetchData = () => {
    props.getCheque(today, props.url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let chequeTable = null;

  if (props.todayCheque != null) {
    function createChequeData(name, value, bankDate) {
      return { name, value, bankDate };
    }

    const chequeRows = props.todayCheque.map((cheque) =>
      createChequeData(cheque.Name, cheque.Value, cheque.BankDate)
    );

    chequeTable = (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Bank Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chequeRows.map((cheque) => (
              <TableRow key={`${cheque.name}${cheque.value}`}>
                <TableCell component="th" scope="row">
                  {cheque.name}
                </TableCell>
                <TableCell align="right">{cheque.value}</TableCell>
                <TableCell align="right">{cheque.bankDate}</TableCell>
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
          <p className={classes.headerTitle}>Today Cheque</p>
        </Card>
        <div className={classes.table}>{chequeTable} </div>
      </Card>
    </Grid>
  );
};

const mapStateProps = (state) => {
  return {
    todayCheque: state.getData.todayCheque,
    error: state.getData.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCheque: (date, url) => dispatch(getDataActions.getTodayCheque(date, url)),
  };
};

export default connect(mapStateProps, mapDispatchToProps)(TodayChequeTable);
