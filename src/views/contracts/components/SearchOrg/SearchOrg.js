import React, { useState } from "react";
import { Input, Button, Form, Select } from "antd";

import "./searchOrg.css";

const { Option } = Select;

function SearchOrg(props) {
  const [form] = Form.useForm();
  const {
    handleSearch,
    loading,
    handleChange,
    handleSearchInputChange,
    searchBy,
  } = props;

  return (
    <div className="crt-sch-container">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          layout: "vertical",
        }}
        // onFinish={handleSearch}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Form.Item label="Search By">
          <Select
            // defaultValue="Code"
            style={{ width: 120 }}
            value={searchBy}
            onChange={handleChange}
          >
            <Option value="Code">Code</Option>
            <Option value="Contact Email">Contact Email</Option>
          </Select>
        </Form.Item>
        <Form.Item label={searchBy}>
          <Input
            onChange={handleSearchInputChange}
            placeholder={`Enter ${searchBy}`}
          />
        </Form.Item>
        <div className="crt-sch-btnContainer">
          <Form.Item label="  ">
            <Button onClick={handleSearch} loading={loading} type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default SearchOrg;
