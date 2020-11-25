import React from "react";
import { List, Typography, Divider } from "antd";
import "./staff.css";

const data = [
  "James Beard",
  "Lester Sumrall",
  "Boris Johnson.",
  "Leonardo Di Caprio.",
  "Beneventura Inagi",
];

function StaffManagement() {
  function renderListItem(item) {
    return (
      <List.Item>
        <Typography.Text mark>[ITEM]</Typography.Text> {item}
      </List.Item>
    );
  }
  return (
    <div>
      <Divider orientation="left">Default Size</Divider>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={renderListItem}
      />
    </div>
  );
}

export default StaffManagement;
