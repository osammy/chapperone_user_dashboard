// import asyncComponent from '../Components/AsyncComponent';
import Login from "../views/Login/Login";
import Contracts from "../views/contracts/Contracts";

// //async
// const asyncUsers = asyncComponent(()=> {import('../Views/Users/Users')});
// const asyncShippers= asyncComponent(()=> {import('../Views/Shippers/Shippers')});
// const asyncRecords = asyncComponent(()=> {import('../Views/Records/Records')});
// const asyncFinancials = asyncComponent(()=> {import('../Views/Financials/Financials')});

// const asyncDiscount = asyncComponent(()=> {import('../Views/Discount/Discount')})
// const asyncPricing= asyncComponent(()=> {import('../Views/Pricing/Pricing')});
// const asyncSettings = asyncComponent(()=> {import('../Views/Settings/Settings')});
// const asyncQuery = asyncComponent(()=> {import('../Views/Query/Query')});

// const asyncZones = asyncComponent(()=> {import('../Views/Zones/Zones')})
// const asyncViewZone = asyncComponent(()=> {import('../Views/Zones/ViewZone')});
// const asyncOperations = asyncComponent(()=> {import('../Views/Operations/Operations')});
// const asyncViewOperation= asyncComponent(()=> {import('../Views/Operations/ViewOperation')});
// const asyncHome = asyncComponent(()=> {import('../Views/Home/Home')});

//end
const dashboardRoutes = [
  {
    path: "/dashboard/users",
    name: "User Management",
    icon: "pe-7s-graph",
    exact: false,
    component: Login,
  },
  {
    path: "/dashboard/staff",
    name: "Staff Management",
    icon: "pe-7s-graph",
    exact: false,
    component: Login,
  },
  {
    path: "/dashboard/contracts",
    name: "Staff Management",
    icon: "pe-7s-graph",
    exact: false,
    component: Contracts,
  },
  {
    path: "/dashboard/organisations",
    name: "Staff Management",
    icon: "pe-7s-graph",
    exact: false,
    component: Contracts,
  },

  // { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
