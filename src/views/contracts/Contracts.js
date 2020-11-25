import React from "react";
import { DatePicker, Space, Button, Form, Input } from "antd";

import SearchOrg from "./components/SearchOrg/SearchOrg";

import "./contracts.css";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

function Contracts() {
  const [form] = Form.useForm();

  return (
    <div className="cnt-container">
      <SearchOrg />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          layout: "vertical",
        }}
      >
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input placeholder="Organisation Name" />
        </FormItem>
        <div className="space-between">
          <FormItem name="first_name" rules={[{ required: true }]} hasFeedback>
            <Input placeholder="Organisation Name" />
          </FormItem>
          <FormItem name="username" rules={[{ required: true }]} hasFeedback>
            <Input placeholder="Organisation Name" />
          </FormItem>
        </div>
      </Form>
    </div>
  );
}

export default Contracts;
