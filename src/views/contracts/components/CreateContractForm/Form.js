import React from "react";
import { Form, Input, DatePicker, Button } from "antd";

import "./createContactForm.css";

function CreateContractForm(props) {
  const [form] = Form.useForm();
  const {
    organisation,
    handleInputChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit,
    loading,
  } = props;

  return (
    <div className="ctf-container">
      <p>
        <b>{organisation.name}</b>
      </p>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          layout: "vertical",
        }}
        // onFinish={() => alert("her")}
      >
        <Form.Item
          className="ctf-formItem"
          name="contactEmail"
          label="Contact Email Address"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            name="contactEmail"
            onChange={handleInputChange}
            placeholder="Enter Contact Email"
          />
        </Form.Item>
        <Form.Item
          className="ctf-formItem"
          name="amount"
          label="Amount"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            name="amount"
            onChange={handleInputChange}
            placeholder="Enter Amount"
          />
        </Form.Item>
        <Form.Item
          className="ctf-formItem"
          name="description"
          label="Description"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            name="description"
            onChange={handleInputChange}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item
          className="ctf-formItem"
          name="startDate"
          placeholder="Start Date"
          label="Start Date"
          rules={[{ required: true }]}
          hasFeedback
        >
          <DatePicker
            onChange={handleStartDateChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          className="ctf-formItem"
          name="dateRange"
          placeholder="End Date"
          label="End Date"
          rules={[{ required: true }]}
          hasFeedback
        >
          <DatePicker
            onChange={handleEndDateChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            onClick={handleSubmit}
            loading={loading}
            style={{ width: "100%" }}
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateContractForm;
