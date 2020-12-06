import { Grid, Card, Typography, Divider } from "@material-ui/core";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import SaleIcon from "@material-ui/icons/MonetizationOnOutlined";
import React from "react";
import classes from "./TodaySummeryCard.module.css";

const TodaySummeryCard = (props) => {
  const column1Titles = [
    "Sale",
    "Profit",
    "Credit",
    "Cash Recceipts",
    "Cheque",
    "Diesel",
    "Other Cost",
  ];
  const column2Titles = ["1", "2", "3", "4", "5", "6", "7"];

  let headerStyle;
  let cardTitle;
  switch (props.id) {
    case "1":
      headerStyle = { background: "linear-gradient(60deg, #ffa726, #fb8c00)" };
      cardTitle = "Today Summery";
      break;
    case "2":
      headerStyle = { background: "linear-gradient(60deg, #66bb6a, #43a047)" };
      cardTitle = "Month Summery";
      break;
    default:
  }

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      lg={6}
      style={{ position: "relative", paddingTop: "20px" }}
    >
      <Card className={classes.card}>
        <div className={classes.header} style={headerStyle}>
          <SaleIcon
            className={classes.iconWrapper}
            style={{ fontSize: "50px" }}
          />
          {cardTitle}
        </div>
        <div className={classes.content}>
          <div className={classes.contentColumn1}>
            {column1Titles.map((title) => (
              <h1 key={title} className={classes.h2}>
                {title}
              </h1>
            ))}
          </div>
          <div className={classes.contentColumn2}>
            {column2Titles.map((key) => (
              <h1 key={key} className={classes.h2}>
                -
              </h1>
            ))}
          </div>
          <div className={classes.contentColumn3}>
            <h1 className={classes.h2}>{props.sale}</h1>
            <h1 className={classes.h2}>{props.profit}</h1>
            <h1 className={classes.h2}>{props.credit}</h1>
            <h1 className={classes.h2}>{props.cashReceipts}</h1>
            <h1 className={classes.h2}>{props.cheque}</h1>
            <h1 className={classes.h2}>{props.diesel}</h1>
            <h1 className={classes.h2}>{props.otherCost}</h1>
          </div>
        </div>
        <Divider />
        <div className={classes.footer}>
          <div className={classes.contentColumn1}>
            <h1 className={classes.h2}>Varince</h1>
          </div>
          <div className={classes.contentColumn3}>
            <h1 className={classes.h2}>{props.varince}</h1>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default TodaySummeryCard;
