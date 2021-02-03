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
    console.log(admins);
    function isAdmin(id) {
      let userIsAdmin = false;
      try {
        userIsAdmin = admins.find((el) => {
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
          organisation: user.organisation,
        };
        const response = await requests.getWithAuth(url, params);
        const data = response.data;
        // // Add keys to data, just because of ant design Table dispoay component
        // const orgStaffs = data.map((el, index) => {
        //   return {
        //     key: `${index}`,
        //     ...el,
        //     created_at: dateUtil.formatDate(el.created_at),
        //     admin: isAdmin(el._id),
        //   };
        // });
        setStaffs(data);
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

      await requests.putWithAuth(url, { staffs: selectedStaffs });
      const cOfStaffs = [...staffs];
      selectedStaffs.forEach((selectedStaff) => {
        const indx = cOfStaffs.findIndex((el) => el._id === selectedStaff._id);
        if (indx !== -1) {
          cOfStaffs[indx].verified = true;
        }
      });

      setStaffs(cOfStaffs);
    } catch (e) {
      helpers.displayMessage(e);
    }
  }

  async function addAdmin(userId) {
    try {
      const user = userUtil.getUserFromLocalStorage();
      const url = `${getUrl("organisations")}/${user.organisation}/addAdmin`;
      await requests.putWithAuth(url, { userId });
      const index = staffs.findIndex((staff) => staff._id === userId);
      if (index !== -1) {
        const cOfStaffs = [...staffs];
        const theStaff = cOfStaffs[index];
        theStaff.admin = "Yes";
        cOfStaffs[index] = theStaff;
        setStaffs(cOfStaffs);
      }
    } catch (e) {
      helpers.displayMessage(e);
    }
  }

  async function removeAdmin(userId) {
    try {
      const user = userUtil.getUserFromLocalStorage();
      const url = `${getUrl("organisations")}/${user.organisation}/removeAdmin`;
      await requests.putWithAuth(url, { userId });
      const index = staffs.findIndex((staff) => staff._id === userId);
      if (index !== -1) {
        const cOfStaffs = [...staffs];
        const theStaff = cOfStaffs[index];
        theStaff.admin = "No";
        cOfStaffs[index] = theStaff;
        setStaffs(cOfStaffs);
      }
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
