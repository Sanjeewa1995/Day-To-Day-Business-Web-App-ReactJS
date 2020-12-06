import { Grid, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../home/calender.css";
import classes from "./Home.module.css";
import * as getDataActions from "../../store/actions/index";
import { connect } from "react-redux";

const today = Moment(Date.now()).format("YYYY.MM.DD");
const month = Moment(Date.now()).format("MM");

class Home extends Component {
  componentDidMount() {
    this.props.getData(today);
    this.props.getCheque(today);
    this.props.getCredit(today);
    this.props.getMonthSummery(month);
  }

  render() {
    let chequeTable = null;
    let creditTable = null;

    if (this.props.todayCheque != null) {
      function createChequeData(name, value, bankDate) {
        return { name, value, bankDate };
      }

      const chequeRows = this.props.todayCheque.map((cheque) =>
        createChequeData(cheque.Name, cheque.Value, cheque.BankDate)
      );

      chequeTable = (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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

    if (this.props.todayCredit != null) {
      function createCreditData(name, value) {
        return { name, value };
      }

      const creditRows = this.props.todayCredit.map((credit) =>
        createCreditData(credit.Name, credit.Value)
      );

      creditTable = (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          md={6}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid md={6} item className={classes.calender}>
              <Calendar
                className={"react-calendar"}
                onClickDay={(value, event) => {
                  this.props.getData(Moment(value).format("YYYY.MM.DD"));
                  this.props.getCheque(Moment(value).format("YYYY.MM.DD"));
                  this.props.getCredit(Moment(value).format("YYYY.MM.DD"));
                  this.props.getMonthSummery(Moment(value).format("MM"));
                }}
              ></Calendar>
            </Grid>
            <Grid
              container
              direction="column"
              item
              md={5}
              justify="flex-start"
              alignItems="center"
            >
              <Grid
                container
                direction="column"
                item
                justify="center"
                className={classes.typographyItemContainer}
                style={{ padding: "10px", margin: "0px", height: "220px" }}
              >
                {<Typography variant="h3">Summery</Typography>}
                {this.props.todaySummery === null ? (
                  <Typography>{"Data is not added yet"}</Typography>
                ) : (
                  Object.keys(this.props.todaySummery).map((key) => {
                    return (
                      <Typography key={key}>
                        {key}: {this.props.todaySummery[key]}
                      </Typography>
                    );
                  })
                )}
              </Grid>
              <Grid
                container
                direction="column"
                item
                justify="center"
                className={classes.typographyItemContainer}
                style={{ padding: "10px", margin: "10px 0px", height: "220px" }}
              >
                {<Typography variant="h3">Month</Typography>}
                {this.props.error ? (
                  <Typography>{"Data is not added yet"}</Typography>
                ) : (
                  Object.keys(this.props.monthSummery).map((key) => {
                    return (
                      <Typography key={key}>
                        {key}: {this.props.monthSummery[key]}
                      </Typography>
                    );
                  })
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          md={5}
        >
          <Grid
            container
            item
            md={11}
            direction="column"
            justify="flex-start"
            className={classes.typographyItemContainer}
            style={{
              padding: "10px 10px 20px 10px",
              margin: '0px'
            }}
          >
            {<Typography variant="h3" style={{marginBottom: '10px'}}>Cheque</Typography>}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ height: "250px", overflow: "auto" }}
            >
              {chequeTable != null ? (
                chequeTable
              ) : (
                <Typography>Data is not added yet</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            item
            md={11}
            justify="center"
            className={classes.typographyItemContainer}
            style={{ padding: "10px 10px 20px 10px", margin: "10px 0px" }}
          >
            {<Typography variant="h3">Credit</Typography>}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ height: "200px", overflow: "auto" }}
            >
              {creditTable != null ? (
                creditTable
              ) : (
                <Typography>Data is not added yet</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateProps = (state) => {
  return {
    todaySummery: state.todaySummery,
    todayCheque: state.todayCheque,
    todayCredit: state.todayCredit,
    monthSummery: state.monthSummery,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (date) => dispatch(getDataActions.getTodayData(date)),
    getCheque: (date) => dispatch(getDataActions.getTodayCheque(date)),
    getCredit: (date) => dispatch(getDataActions.getTodayCredit(date)),
    getMonthSummery: (month) => dispatch(getDataActions.getMonthSummery(month)),
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Home);
