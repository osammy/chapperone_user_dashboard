import React, { useState } from "react";

import { Button, Table } from "../../../../components";
import { SpaceBetween } from "./styles";

function Staff(props) {
  const [selectionType, setSelectionType] = useState("checkbox");

  //   const columns = [
  //     {
  //       title: "First Name",
  //       dataIndex: "first_name",
  //       //   render: text => <a>{text}</a>,
  //     },
  //     {
  //       title: "Last Name",
  //       dataIndex: "last_name",
  //     },
  //     {
  //       title: "Email Address",
  //       dataIndex: "email",
  //     },
  //     {
  //       title: "Verify",
  //       dataIndex: "verify",
  //     },
  //     {
  //       title: "Remove",
  //       dataIndex: "remove",
  //     },
  //   ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      {/* <table>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Samuel</td>
            <td>Imafidon</td>
            <td>osamaimafidon@gmail.com</td>
            <td>
              <Button
                title="Verify"
                type="primary"
                shape="round"
                icon={<CheckOutlined />}
                size={13}
              />
            </td>
            <Button title="delete" icon={<DeleteOutlined />} size={10} />
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Staff;
