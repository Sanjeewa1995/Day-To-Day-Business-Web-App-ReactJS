import ChartistGraph from "react-chartist";
import Chartist from "chartist";

import { Grid, Card, Typography } from "@material-ui/core";

import React, { Component } from "react";

import classes from "./Charts.module.css";
import "./chart-style.css";

import { firestore } from "../../../firebase";
import Moment from "moment";

const year = Moment(Date.now()).format("YYYY");

class DayChart extends Component {
  state = {
    date: null,
    value: [],
    totleSale: 0,
  };

  fetchData = null;

  componentDidMount() {
    this.fetchData = firestore
      .collection(this.props.dailyReportEndPoint)
      .orderBy("Date")
      .limitToLast(15)
      .onSnapshot(
        (value) => {
          const date = value.docs.map((doc) => {
            return Moment(Date.parse(doc.data()["Date"])).format("DD");
          });
          const sales = value.docs.map((doc) => {
            return parseInt(doc.data()["Sale"]);
          });
          const totleSale = sales.reduce((a, b) => a + b, 0);
          this.setState({ date: date, value: sales, totleSale: totleSale });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentWillUnmount() {
    this.fetchData();
  }

  render() {
    const dailySalesChart = {
      data: {
        labels: this.state.date,
        series: [this.state.value],
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 150000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 15,
        },
      },
      // for animation
      animation: {
        draw: function (data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint,
              },
            });
          } else if (data.type === "point") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * 80,
                dur: 500,
                from: 0,
                to: 1,
                easing: "ease",
              },
            });
          }
        },
      },
    };
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{
          paddingTop: "50px",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <Card className={classes.card}>
          <div
            className={classes.chartWrapper}
            style={{ background: "linear-gradient(60deg, #66bb6a, #43a047)" }}
          >
            <ChartistGraph
              className="ct-chart"
              type="Line"
              data={dailySalesChart.data}
              options={dailySalesChart.options}
              listener={dailySalesChart.animation}
            ></ChartistGraph>
          </div>
          <div className={classes.footer}>
            <Typography variant="h4" align="left">
              Daily Sale
            </Typography>
            <Typography variant="h5" align="left">
              Last 15 Days-Rs {this.state.totleSale}
            </Typography>
          </div>
        </Card>
      </Grid>
    );
  }
}

class MonthChart extends Component {
  state = {
    monthSales: [],
  };

  unsuscribeData = null;

  componentDidMount() {
    this.unsuscribeData = firestore
      .collection(this.props.dailyReportEndPoint)
      .where("Year", "==", year)
      .onSnapshot(
        (value) => {
          let monthSales = [];
          const allDocs = [];
          value.docs.map((doc) => {
            allDocs.push({
              Month: doc.data()["Month"],
              Sale: doc.data()["Sale"],
            });
            return allDocs;
          });
          console.log(allDocs);

          for (let i = 1; i < 13; i++) {
            let monthSale = 0;
            let month = i < 10 ? "0".concat(i.toString()) : i.toString();
            const monthDocs = allDocs.filter((doc) => {
              return doc.Month === month;
            });
            if (monthDocs.length > 0) {
              monthDocs.map((doc) => {
                monthSale += doc.Sale;
                return monthSale;
              });
              monthSales.push(monthSale);
              this.setState({ monthSales: monthSales });
            }
            monthSales.push(0);
            this.setState({ monthSales: monthSales });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentWillUnmount() {
    this.unsuscribeData();
  }

  render() {
    const dailySalesChart = {
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        series: [this.state.monthSales],
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 1000000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 15,
        },
      },
      // for animation
      animation: {
        draw: function (data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint,
              },
            });
          } else if (data.type === "point") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * 80,
                dur: 500,
                from: 0,
                to: 1,
                easing: "ease",
              },
            });
          }
        },
      },
    };

    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{
          paddingTop: "50px",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <Card className={classes.card}>
          <div
            className={classes.chartWrapper}
            style={{ background: "linear-gradient(60deg, #ef5350, #e53935)" }}
          >
            <ChartistGraph
              className="ct-chart"
              type="Line"
              data={dailySalesChart.data}
              options={dailySalesChart.options}
              listener={dailySalesChart.animation}
            ></ChartistGraph>
          </div>
          <div className={classes.footer}>
            <Typography variant="h4" align="left">
              Monthly Sale
            </Typography>
            <Typography variant="h5" align="left">
              Last 12 Month-Rs 267890
            </Typography>
          </div>
        </Card>
      </Grid>
    );
  }
}

export { DayChart, MonthChart };
