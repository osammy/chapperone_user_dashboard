import Login from "../views/Login/Login";
import Dashboard from "../layouts/dashboard/Dashboard";
import ContractRegistration from "../views/ContractRegistration/ContractRegistration";
// import Home from '../Views/Home/Home';
// import Query from '../Views/Query/Query';
// import Login from "../Views/Login/Login";
// import asyncComponent from "../Components/AsyncComponent";
// const AsyncDashboardLayout = asyncComponent(() =>
//   import("../Layouts/Dashboard/DashboardLayout.js")
// );

var indexRoutes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard, exact: false },
  { path: "/login", name: "Login", component: Login, exact: true },
  {
    path: "/contract_registration/:orgId",
    name: "Contracts Registration",
    component: ContractRegistration,
    exact: false,
  },
];

export default indexRoutes;
