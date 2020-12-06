import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  todaySummery:{
    Sale: 0,
    Profit: 0,
    Credit: 0,
    Cheque: 0,
    Diesel:0,
    OtherCost: 0,
    CashReceipts:0,
    Disccount:0,
    CashVariance: 0,
  },
  todayCheque: null,
  todayCredit: null,
  monthSummery: {
    Sale: 0,
    Profit: 0,
    Credit: 0,
    Cheque: 0,
    Diesel:0,
    OtherCost: 0,
    CashReceipts:0,
    Disccount:0,
    CashVariance: 0,
  },
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TODAY_DATA:
      return {
        ...state,
        todaySummery: action.todaySummery,
        error: false,
      };
    case actionTypes.GET_TODAY_CHEQUE:
      return {
          ...state,
        todayCheque: action.todayCheque,
        error: false,
      };
      case actionTypes.GET_TODAY_CREDIT:
      return {
        ...state,
        todayCredit: action.todayCredit,
        error: false,
      };
      case actionTypes.MONTH_SUMMERY:
        return {
         ...state,
          monthSummery: action.monthSummery,
          error: state.error,
        };
    case actionTypes.GET_TODAY_DATA_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
