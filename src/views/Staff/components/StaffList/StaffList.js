import React, { useState } from "react";
import {
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";

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
  const { staffs, removeAdmin, addAdmin } = props;
  const [selectionType, setSelectionType] = useState("radio");
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
      title: "Admin",
      dataIndex: "admin",
    },
    {
      title: "Registered On",
      dataIndex: "created_at",
    },
  ];

  //   function verifyStaffs(users) {
  //     getUrl
  //   }

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
            {selected[0].admin ? (
              <Button
                shape="round"
                onClick={() => removeAdmin(selected[0]?._id)}
                icon={<DeleteOutlined />}
                containermargin="0 10px"
                title="Remove admin"
                type="secondary"
              />
            ) : (
              <Button
                shape="round"
                onClick={() => addAdmin(selected[0]?._id)}
                type="primary"
                icon={<CheckOutlined />}
                containermargin="0 10px"
                title="Set as admin"
              />
            )}
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
          dataSource={staffs}
        />
      </TableContainer>
    </Container>
  );
}

export default StaffList;
