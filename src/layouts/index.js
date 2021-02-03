import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
  DashboardOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
export const sideBarMenuItemsList = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardOutlined,
    protected: true,
    subItems: [],
  },
  {
    path: "/dashboard/staffs",
    name: "Staff Management",
    icon: UsergroupDeleteOutlined,
    protected: true,
    subItems: [],
  },
  // {
  //   path: "/dashboard/contracts",
  //   name: "Contract Management",
  //   icon: ReconciliationOutlined,
  //   protected: true,
  //   subItems: [],
  // },
  {
    path: "/dashboard/mycontract",
    name: "MY Contract",
    icon: ContainerOutlined,
    protected: true,
    subItems: [],
  },

  //,

  // { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];
