import React, { useState, useEffect } from "react";
import { List, Typography, Divider } from "antd";
import { connect } from "react-redux";

import StaffVerificationList from "./components/StaffList/StaffVerificationList";
import StaffList from "./components/StaffList/StaffList";
import { userUtil, helpers, dateUtil } from "../../utils";
import { requests, getUrl } from "../../globals/requests";
import "./staff.css";

function StaffManagement(props) {
  const [staffs, setStaffs] = useState([]);
  const admins = props.organisation?.admins || [];
  useEffect(() => {
    console.log(props.organisation);
    function isAdmin(id) {
      let userIsAdmin = false;
      try {
        userIsAdmin = admins.find((el) => {
          alert("hey");

          return id === el.userId;
        });
      } catch (e) {}

      return userIsAdmin ? "Yes" : "No";
    }
    async function getStaffs() {
      try {
        const user = userUtil.getUserFromLocalStorage();
        const url = `${getUrl("users")}/admins/organisations/${
          user.organisation
        }`;
        const params = {
          role: "teacher",
        };
        const response = await requests.getWithAuth(url, params);
        const data = response.data;
        // Add keys to data, just because of ant design Table dispoay component
        const orgStaffs = data.map((el, index) => {
          return {
            key: `${index}`,
            ...el,
            created_at: dateUtil.formatDate(el.created_at),
            admin: isAdmin(el._id),
          };
        });
        setStaffs(orgStaffs);
      } catch (e) {
        helpers.displayMessage(e);
      }
    }

    getStaffs();
  }, []);
  function renderListItem(item) {
    return (
      <List.Item>
        <Typography.Text mark>[ITEM]</Typography.Text> {item}
      </List.Item>
    );
  }

  async function verifyStaffs(selectedStaffs) {
    try {
      const url = `${getUrl("users")}/admins/verifyStaffs`;

      const users = await requests.putWithAuth(url, { staffs: selectedStaffs });

      console.log(users.data);
    } catch (e) {
      helpers.displayMessage(e);
    }
  }

  async function addAdmin(userId) {
    try {
      const user = userUtil.getUserFromLocalStorage();
      const url = `${getUrl("organisations")}/${user.organisation}/addAdmin`;
      const response = await requests.putWithAuth(url, { userId });

      console.log(response.data);
    } catch (e) {
      helpers.displayMessage(e);
    }
  }

  async function removeAdmin(userId) {
    try {
      const user = userUtil.getUserFromLocalStorage();
      const url = `${getUrl("organisations")}/${user.organisation}/removeAdmin`;
      const response = await requests.putWithAuth(url, { userId });
    } catch (e) {
      helpers.displayMessage(e);
    }
  }
  return (
    <div>
      <Divider orientation="left">Verification Requests</Divider>
      <StaffVerificationList staffs={staffs} verifyStaffs={verifyStaffs} />
      <Divider orientation="left">Teachers</Divider>
      <StaffList
        staffs={staffs}
        removeAdmin={removeAdmin}
        addAdmin={addAdmin}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    organisation: state.organisationsReducer.organisation,
  };
};

export default connect(mapStateToProps)(StaffManagement);
