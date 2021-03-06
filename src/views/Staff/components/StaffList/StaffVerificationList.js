import React, { useState } from "react";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

import Staff from "./Staff";
import { Button, Table } from "../../../../components";
// import { Table } from "antd";

import {
  Container,
  FlexEnd,
  TableContainer,
  TableButtonsContainer,
} from "./styles";

function StaffList(props) {
  const { staffs, verifyStaffs } = props;
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selected, setSelected] = useState([]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
    },
    {
      title: "Registered On",
      dataIndex: "created_at",
    },
    // {
    //   title: "",
    //   dataIndex: "verify",
    //   render: (text) => (selected ? <a>Verify Selected</a> : null),
    // },
    // {
    //   title: "",
    //   dataIndex: "verify",
    //   render: (text) => (selected ? <a>Remove Selected</a> : null),
    // },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelected(
        selectedRows.map((el) => ({
          _id: el._id,
          organisation: el.organisation,
        }))
      );
    },
    getCheckboxProps: (record) => ({
      //   disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Container>
      <TableButtonsContainer>
        {selected.length !== 0 && (
          <FlexEnd>
            <Button
              onClick={() => verifyStaffs(selected)}
              shape="round"
              icon={<CheckOutlined />}
              containermargin="0 10px"
              title="Verify Selected"
              type="primary"
            />
            <Button
              shape="round"
              icon={<DeleteOutlined />}
              title="Remove Selected"
            />
          </FlexEnd>
        )}
      </TableButtonsContainer>

      <TableContainer>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={staffs.filter((el) => el.verified === false)} // return only sfaff with `verified: false`
        />
      </TableContainer>
    </Container>
  );
}

export default StaffList;
