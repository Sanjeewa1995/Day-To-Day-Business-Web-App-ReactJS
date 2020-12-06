import React from "react";
import { NavLink, Route } from "react-router-dom";

import WijayaDB from "../Dashboard/Dashboard";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Header from '../header/Header';
import { wijayaRoutes } from "../../routes";
import { Button, Hidden } from "@material-ui/core";

import DashboardIcon from '@material-ui/icons/Dashboard';

import wijayaLogo from '../../assets/img/wijaya.jpg';

const Wijaya = () => {

  const url = {
     todayReportUrl : "wijaya/day-to-day-reports/today-report",
     todayChequeUrl : "wijaya/day-to-day-reports/today-cheques",
     todayCreditUrl : "wijaya/day-to-day-reports/today-credit"
  }

  const companyName = 'Wijaya Products';

  const addUserItem ={
    path: "",
    name: "Add User",
     icon: DashboardIcon,
    layout: "/add-user"
  }

  const updatedWijayaRoutes = [...wijayaRoutes];

  updatedWijayaRoutes.push(addUserItem);

  return (
    <div>
      <Hidden mdUp implementation="css"><Header/></Hidden>
      <SideDrawer routes={updatedWijayaRoutes} companyName={companyName} companyLogo={wijayaLogo} >
      <NavLink to={'/raigam/dashboard'} activeStyle={{ textDecoration: "none" }} style={{textDecoration:'none'}}>
        <Button variant="contained" color="secondary">
          Switch Company
        </Button>
        </NavLink>
      </SideDrawer>
      <Route path="/wijaya/dashboard" exact component={()=><WijayaDB url={url}/>} />
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

export default Wijaya;
