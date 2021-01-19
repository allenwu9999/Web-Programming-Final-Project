import "antd/dist/antd.css";
import React from "react";
import "./SignUp.css";
import { Form, Typography, Input, Button, Radio, Row, Col } from "antd";

import Template from "../Template/Template";
const { Title } = Typography;
function SignUp() {
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const Render = (
    <>
      <div
        style={{
          paddingBottom: 30,
          paddingTop: 30,
        }}
      >
        <Title align="center">Ideas Republica</Title>
        <Title align="center" level={2}>
          Sign Up Your Account
        </Title>
      </div>
      <div className="content">
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            name="realname"
            label="Realname"
            rules={[
              {
                required: true,
                message: "This column can not be empty.",
              },
            ]}
          >
            <Input size="large" placeholder="username" />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            rules={[
              {
                required: true,
                message: "This column can not be empty.",
              },
            ]}
          >
            <Input size="large" placeholder="nickname" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Please input a valid email.",
              },
              {
                required: true,
                message: "This column can not be empty.",
              },
            ]}
          >
            <Input size="large" placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "This column can not be empty.",
              },
            ]}
          >
            <Input.Password size="large" placeholder="password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "This column can not be empty.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Two password not matched, please chcek again."
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="password" />
          </Form.Item>

          <Form.Item
            name="account"
            label="account type"
            rules={[
              {
                required: true,
                message: "Please choose one type.",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="r">Reviewer</Radio>
              <Radio value="n">Normal User</Radio>
            </Radio.Group>
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" size="large">
                Create Account
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="signin">
          Already have an account? <a href="./sign-in">Sign in here</a>
        </div>
      </div>
    </>
  );
  return <Template content={Render} />;
}

export default SignUp;
