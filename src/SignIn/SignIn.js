import "antd/dist/antd.css";
import React from "react";
import { Form, Input, Button, Avatar, Row, Col } from "antd";
import Template from "../Template/Template";
import { UserOutlined } from "@ant-design/icons";
import "./SignIn.css";
import FormItem from "antd/lib/form/FormItem";

function SignIn() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const Render = (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          paddingBottom: 50,
          paddingTop: 50,
        }}
      >
        <Avatar size={256} icon={<UserOutlined />} />
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username.",
              },
            ]}
          >
            <Input size="large" placeholder="username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password.",
              },
            ]}
          >
            <Input.Password size="large" placeholder="password" />
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" size="large">
                Sign In
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
  return <Template content={Render} />;
}

export default SignIn;
