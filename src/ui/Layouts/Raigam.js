import React from "react";
import { Route, NavLink } from "react-router-dom";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { raigamRoutes } from "../../routes";
import RaigamDB from "../Dashboard/Dashboard";

import { Button } from "@material-ui/core";

import raigamLogo from '../../assets/img/raigam.jpg'

const RaigamLayOut = (props) => {

    const url = {
        todayReportUrl : "raigam/day-to-day-reports/today-report",
        todayChequeUrl : "raigam/day-to-day-reports/today-cheques",
        todayCreditUrl : "raigam/day-to-day-reports/today-credit"
     }

     const companyName = 'Raigam Products';



  return (
    <div>
      <SideDrawer routes={raigamRoutes} companyName={companyName} companyLogo={raigamLogo}>
        <NavLink
          to={"/wijaya/dashboard"}
          activeStyle={{ textDecoration: "none" }}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="secondary">
            Switch Company
          </Button>
        </NavLink>
      </SideDrawer>
      <Route path="/raigam/dashboard" exact component={()=><RaigamDB url={url}/>} />
      <Route
        path="/wijaya/day-wise-summery"
        component={() => <h1>summery</h1>}
      />
      <Route path="/month-wise" component={() => <h1>month wise</h1>} />
      <Route path="/year-wise" component={() => <h1>year wise</h1>} />
      <Route path="/cheque" component={() => <h1>cheque</h1>} />
      <Route path="/credit" component={() => <h1>credit</h1>} />
      <Route path="/company-cheque" component={() => <h1>company cheque</h1>} />
    </div>
  );
};

export default RaigamLayOut;
