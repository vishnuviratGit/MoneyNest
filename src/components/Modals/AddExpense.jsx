import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddExpense = ({ isExpenseModalVisible, handleExpenseCancel, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the transaction name" }]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input the amount" }]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select the income date!" }]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Select type of the income" }]}
        >
          <Select placeholder="Select tag" className="custom-input"  style={{ height: 45 }}
  dropdownStyle={{ fontSize: "18px" }}>
            <Select.Option value="Freelance">Food</Select.Option>
            <Select.Option value="Salary">Education</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="utilities">utilities</Select.Option>
            <Select.Option value="Transportation">Transportation</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Button
          htmlType="submit"
          style={{ backgroundColor: "var(--theme)", color: "white", height: "40px" }}
        >
          Add Expense
        </Button>
      </Form>
    </Modal>
  );
};

export default AddExpense;
