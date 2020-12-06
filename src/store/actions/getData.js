import * as actionTypes from "./actionsTypes";
import { firestore } from "../../firebase";

export const setTodaySummery = (todaySummery) => {
  return {
    type: actionTypes.GET_TODAY_DATA,
    todaySummery: todaySummery,
  };
};

export const setTodayCheque = (todayCheque) => {
  return {
    type: actionTypes.GET_TODAY_CHEQUE,
    todayCheque: todayCheque,
  };
};

export const setTodayCredit = (todayCredit) => {
  return {
    type: actionTypes.GET_TODAY_CREDIT,
    todayCredit: todayCredit,
  };
};

export const setMonthSummery = (monthSummery) => {
  return {
    type: actionTypes.MONTH_SUMMERY,
    monthSummery: monthSummery,
  };
};

export const setTodayDataFailed = () => {
  return {
    type: actionTypes.GET_TODAY_DATA_FAILED,
  };
};

export const getTodayData = (date, todayReportsUrl) => {
  return (dispatch) => {
    firestore
      .collection(todayReportsUrl)
      .doc(date)
      .onSnapshot(
        (value) => {
          if (value.data() != null) {
            const document = value.data();
            const otherCost = document["OtherCost"] + document["Tea"];
            let updateSummery = {
              Sale: document["Sale"] ?? 0,
              Profit: Math.floor(document["Sale"] * 0.07) ?? 0,
              Credit: document["Credit"] ?? 0,
              Cheque: document["Cheque"] ?? 0,
              Diesel: document["Diesel"] ?? 0,
              OtherCost: otherCost ?? 0,
              CashReceipts: document["TodayPayCash"] ?? 0,
              Disccount: document["Disccount"] ?? 0,
              CashVariance: document["Variance"] ?? 0,
            };
            dispatch(setTodaySummery(updateSummery));
          } else {
            const todaySummery = {
              Sale: 0,
              Profit: 0,
              Credit: 0,
              Cheque: 0,
              Diesel: 0,
              OtherCost: 0,
              CashReceipts: 0,
              Disccount: 0,
              CashVariance: 0,
            };
            dispatch(setTodaySummery(todaySummery));
          }
        },
        (error) => {
          dispatch(setTodayDataFailed());
          console.log(error);
        }
      );
  };
};

export const getTodayCheque = (date, todayChequeUrl) => {
  return (dispatch) => {
    firestore
      .collection(todayChequeUrl)
      .where("Date", "==", date)
      .onSnapshot(
        (value) => {
          if (value.docs.length > 0) {
            let updateCheque = value.docs.map((doc) => {
              return {
                Name: doc.data()["Name"],
                Value: doc.data()["Value"],
                BankDate: doc.data()["BankDate"],
              };
            });
            dispatch(setTodayCheque(updateCheque));
          } else {
            dispatch(setTodayCheque(null));
          }
        },
        (error) => {
          dispatch(setTodayDataFailed());
          console.log(error);
        }
      );
  };
};

export const getTodayCredit = (date, todayCreditUrl) => {
  return (dispatch) => {
    firestore
      .collection(todayCreditUrl)
      .where("Date", "==", date)
      .onSnapshot(
        (value) => {
          if (value.docs.length > 0) {
            console.log(value.docs[0].data());

            let updateCredit = value.docs.map((doc) => {
              return {
                Name: doc.data()["Name"],
                Value: doc.data()["Value"],
              };
            });

            dispatch(setTodayCredit(updateCredit));
          } else {
            dispatch(setTodayCredit(null));
          }
        },
        (error) => {
          dispatch(setTodayDataFailed());
          console.log(error);
        }
      );
  };
};

export const getMonthSummery = (month, todayReportUrl) => {
  return (dispatch) => {
    firestore
      .collection(todayReportUrl)
      .where("Month", "==", month)
      .onSnapshot(
        (value) => {
          if (value.docs.length > 0) {
            let totolSale = 0;
            let totolOtherCost = 0;
            let totolProfit = 0;
            let totolCredit = 0;
            let totolCheque = 0;
            let totolVariance = 0;
            let totoleDiesel = 0;
            let totolCashReciepts = 0;
            let totolCashVarince = 0;
            let totolTea =0;
            for (let i = 0; i < value.docs.length; i++) {
              totolSale += value.docs[i].data()["Sale"] ?? 0;
              totolOtherCost +=
                value.docs[i].data()["OtherCost"] ??
                0 ;
                totolTea += value.docs[i].data()["Tea"] ??
                0;
              totolProfit = Math.floor(totolSale * 0.07) ?? 0;
              totolCheque += value.docs[i].data()["Cheque"] ?? 0;
              totolCredit += value.docs[i].data()["Credit"] ?? 0;
              totolVariance += value.docs[i].data()["Variance"] ?? 0;
              totoleDiesel += value.docs[i].data()["Diesel"] ?? 0;
              totolCashReciepts += value.docs[i].data()["TodayPayCash"] ?? 0;
              totolCashVarince += value.docs[i].data()["Variance"] ?? 0;
            }

            let updateMonthSummery = {
              Sale: totolSale,
              Profit: totolProfit,
              Credit: totolCredit,
              CashReceipts: totolCashReciepts,
              Cheque: totolCheque,
              Diesel: totoleDiesel,
              OtherCost: totolOtherCost + totolTea,
              CashVariance: totolCashVarince,
            };

            dispatch(setMonthSummery(updateMonthSummery));
          } else {
            const monthSummery = {
              Sale: 0,
              Profit: 0,
              Credit: 0,
              Cheque: 0,
              Diesel: 0,
              OtherCost: 0,
              CashReceipts: 0,
              Disccount: 0,
              CashVariance: 0,
            };
            dispatch(setMonthSummery(monthSummery));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
};
