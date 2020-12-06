import { Grid } from "@material-ui/core";

import React, { Component } from "react";
import { Redirect, Route, withRouter } from 'react-router-dom';
import classes from "./Dashboard.module.css";

import { connect } from "react-redux";

import TodaySummeryCard from "./TodaySummeryCard/TodatSummeryCard";
import { DayChart, MonthChart } from "./Charts/Charts";
import TodayChequeTable from "./TodayChequeTable/TodayChequeTable";
import TodayCreditTable from "./TodayCreditTable/TodayCreditTable";

import * as getDataActions from "../../store/actions/index";
import Moment from "moment";
import Login from "../Login/Login";

const today = Moment(Date.now()).format("YYYY.MM.DD");
const month = Moment(Date.now()).format("MM");

// const todayReportUrl = "wijaya/day-to-day-reports/today-report";
// const todayChequeUrl = "wijaya/day-to-day-reports/today-cheques";
// const todayCreditUrl = "wijaya/day-to-day-reports/today-credit";


class Dashboard extends Component {

  componentDidMount() {
    this.props.getData(today, this.props.url.todayReportUrl);
    this.props.getMonthSummery(month, this.props.url.todayReportUrl);
  }

  render() {
    
    return (
      <div className={classes.wrapper}>
        <Grid container>
          <TodaySummeryCard
            id="1"
            sale={this.props.todaySummery.Sale}
            credit={this.props.todaySummery.Credit}
            cheque={this.props.todaySummery.Cheque}
            diesel={this.props.todaySummery.Diesel}
            varince={this.props.todaySummery.CashVariance}
            cashReceipts={this.props.todaySummery.CashReceipts}
            profit={this.props.todaySummery.Profit}
            otherCost={this.props.todaySummery.OtherCost}
          />
          <TodaySummeryCard
            id="2"
            sale={this.props.monthSummery.Sale}
            credit={this.props.monthSummery.Credit}
            cheque={this.props.monthSummery.Cheque}
            diesel={this.props.monthSummery.Diesel}
            varince={this.props.monthSummery.CashVariance}
            cashReceipts={this.props.monthSummery.CashReceipts}
            profit={this.props.monthSummery.Profit}
            otherCost={this.props.monthSummery.OtherCost}
          />
          <DayChart dailyReportEndPoint={this.props.url.todayReportUrl}/>
          <MonthChart dailyReportEndPoint={this.props.url.todayReportUrl}/>
          <TodayChequeTable url={this.props.url.todayChequeUrl}/>
          <TodayCreditTable url={this.props.url.todayCreditUrl}/>
        </Grid>
       
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    todaySummery: state.getData.todaySummery,
    monthSummery: state.getData.monthSummery,
    error: state.getData.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (date, urlEndPoint) => dispatch(getDataActions.getTodayData(date, urlEndPoint)),
    getMonthSummery: (month, urlEndPoint) => dispatch(getDataActions.getMonthSummery(month, urlEndPoint)),
  };
};

export default withRouter(connect(mapStateProps, mapDispatchToProps)(Dashboard));
