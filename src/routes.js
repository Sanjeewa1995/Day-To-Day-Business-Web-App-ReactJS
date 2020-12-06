import React from 'react';
import WijayaHome from './ui/home/home';
import {Redirect} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TodayIcon from '@material-ui/icons/Today';
import MonthIcon from '@material-ui/icons/DateRange';
import ChequeIcon from '@material-ui/icons/AccountBalance';
import CreditIcon from '@material-ui/icons/CreditCard';
import CompanyChequeIcon from '@material-ui/icons/ViewCompact';

 export const wijayaRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    //component: DashboardPage,
    layout: "/wijaya"
  },
  {
    path: "/day-wise-summery",
    name: "Day Summery",
    rtlName: "ملف تعريفي للمستخدم",
    icon: TodayIcon,
   // component: UserProfile,
    layout: "/wijaya"
  },
  {
    path: "/month-wise-summery",
    name: "Month Summery",
    rtlName: "قائمة الجدول",
    icon: MonthIcon,
    //component: TableList,
    layout: "/wijaya"
  },
  {
    path: "/cheque",
    name: "Cheque",
    rtlName: "طباعة",
    icon: ChequeIcon,
   // component: Typography,
    layout: "/wijaya"
  },
  {
    path: "/credit",
    name: "Credit",
    rtlName: "الرموز",
   icon: CreditIcon,
   // component: Icons,
    layout: "/wijaya"
  },
  {
    path: "/company-cheque",
    name: "Company Cheque",
    rtlName: "خرائط",
   icon: CompanyChequeIcon,
   // component: Maps,
    layout: "/wijaya"
  }
];


 export const raigamRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    //component: DashboardPage,
    layout: "/raigam"
  },
  {
    path: "/day-wise-summery",
    name: "Day Summery",
    rtlName: "ملف تعريفي للمستخدم",
    icon: TodayIcon,
   // component: UserProfile,
    layout: "/raigam"
  },
  {
    path: "/month-wise-summery",
    name: "Month Summery",
    rtlName: "قائمة الجدول",
    icon: MonthIcon,
    //component: TableList,
    layout: "/raigam"
  },
  {
    path: "/cheque",
    name: "Cheque",
    rtlName: "طباعة",
    icon: ChequeIcon,
   // component: Typography,
    layout: "/raigam"
  },
  {
    path: "/credit",
    name: "Credit",
    rtlName: "الرموز",
   icon: CreditIcon,
   // component: Icons,
    layout: "/raigam"
  },
  {
    path: "/company-cheque",
    name: "Company Cheque",
    rtlName: "خرائط",
   icon: CompanyChequeIcon,
   // component: Maps,
    layout: "/raigam"
  }
];

