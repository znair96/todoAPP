import "antd/dist/antd.css";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import React, { useState } from "react";
function App() {
  //Handled by states
  const columns = [
    {
      title: "Timestamp created",
      dataIndex: "timestamp",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
    },
    {
      title: "Tag",
      dataIndex: "tag",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (operation) => {
        return (
          <>
            <a href="/">Edit</a>
            <a href="/" style={{ marginLeft: 16 }}>
              Delete
            </a>
          </>
        );
      },
    },
  ];
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  let data = [];
  const [list, setList] = useState();
  let listObj = { timestamp: Date.now() };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    //add validations here
    setIsModalVisible(false);
    data.push(listObj);
    setList(data);

    listObj = {};
    // console.log(list);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: "center" }}>Todo List App</h1>
        <Table dataSource={list} columns={columns} />
        <Button
          block
          primary
          style={{ width: 120, display: "flex", justifyContent: "center" }}
          onClick={showModal}
        >
          Add List
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input
                value=""
                onChange={(e) => {
                  listObj.title = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                value=""
                onChange={(e) => {
                  listObj.description = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item label="Due Date">
              <DatePicker
                onChange={(moment) => {
                  let dueDate = moment.format();
                  if (dueDate) {
                    listObj.dueDate = moment.format("DD/MM/YYYY");
                  } else {
                    listObj.dueDate = "";
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Tag">
              <Input
                onChange={(e) => {
                  listObj.tag = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select
                defaultValue="OPEN"
                allowClear
                onChange={(value) => {
                  listObj.status = value;
                  console.log(listObj);
                }}
              >
                <Option value="open">OPEN</Option>
                <Option value="working">WORKING</Option>
                <Option value="done">DONE</Option>
                <Option value="overdue">OVERDUE</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </header>
    </div>
  );
}

export default App;
