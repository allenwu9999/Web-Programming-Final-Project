import "antd/dist/antd.css";
import React from "react";
import { Form, Input, Button, Avatar, Row, Col, Typography } from "antd";
import Template from "../Template/Template";
import { UserOutlined } from "@ant-design/icons";
import "./SignIn.css";
import FormItem from "antd/lib/form/FormItem";
const { Title } = Typography;
function SignIn() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const Render = (
    <>
      <div style={{ paddingTop: 30 }}>
        <Title align="center">Ideas Republica</Title>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          paddingBottom: 50,
          paddingTop: 5,
        }}
      >
        <Avatar
          size={256}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#8fb2eb" }}
        />
      </div>
      <div className="formInput">
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
          <div className="signup">
            No accounts? <a href="./sign-up">Sign up here</a>
          </div>
        </Form>
      </div>
    </>
  );
  return <Template content={Render} />;
}

export default SignIn;
