import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
  ReconciliationOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
export const sideBarMenuItemsList = [
  {
    path: "",
    name: "Staffs",
    icon: AppstoreOutlined,
    protected: true,
    subItems: [
      {
        path: "/dashboard/verified",
        name: "Verified",
        icon: AppstoreOutlined,
        protected: true,
      },
      {
        path: "/dashboard/register",
        name: "Register",
        icon: AppstoreOutlined,
        protected: true,
      },
    ],
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: AppstoreOutlined,
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
  {
    path: "/dashboard/contracts",
    name: "Contract Management",
    icon: ReconciliationOutlined,
    protected: true,
    subItems: [],
  },
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
