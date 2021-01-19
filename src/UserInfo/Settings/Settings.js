import "antd/dist/antd.css";
import React, { useState } from "react";
import Template from "../../Template/Template";
import {
  Avatar,
  Button,
  Typography,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Descriptions,
} from "antd";
import {
  RightCircleFilled,
  TrademarkCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import "./Settings.css";

const { Title, Text } = Typography;
function Settings() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultAvatar, setIsDefaultAvatar] = useState(true);
  const [AvatarColor, setAvatarColor] = useState("");
  const [AvatarName, setAvatarName] = useState("");
  const [IsModify, setIsModify] = useState(false);
  const [IsPassWordShown, setPasswordShown] = useState(false);
  const modifyInfo = () => {
    setIsModify(true);
  };
  const hidePassword = () => {
    setPasswordShown(false);
  };
  const showPassword = () => {
    setPasswordShown(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setIsDefaultAvatar(false);
    setAvatarColor(values.color);
    setAvatarName(values.name);
    handleOk();
  };
  const ModifiedFinish = (values) => {
    console.log("Received values of form: ", values);
    setIsModify(false);
  };
  const ModifiedCancel = () => {
    setIsModify(false);
  };
  const Render = (
    <>
      <div className="title">
        <Title align="left">Settings</Title>
      </div>
      <div className="avatar">
        {isDefaultAvatar ? (
          <Avatar
            size={128}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#8fb2eb" }}
          />
        ) : (
          <Avatar size={128} style={{ backgroundColor: AvatarColor }}>
            {AvatarName}
          </Avatar>
        )}
        <div style={{ paddingBottom: 20 }}></div>
        <Button type="primary" onClick={showModal}>
          Change Avatar
        </Button>
        <Modal
          title="Change Your Avatar"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button form="avatar" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
        >
          <Form id="avatar" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <Input placeholder="input the name you want in avatar" />
            </Form.Item>
            <Form.Item name="color" label="Color">
              <Input type="color" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="content">
        {IsModify ? (
          <>
            <Title level={3} align="center">
              Modify Your Account
            </Title>
            <Form {...formItemLayout} onFinish={ModifiedFinish}>
              <Form.Item
                name="realname"
                label="Realname"
                initialValue="Allen"
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
                initialValue="Dao"
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
                initialValue="b08901057@ntu.edu.tw"
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
                name="oldPassword"
                label="Old Password"
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
                name="newPassword"
                label="New Password"
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
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "This column can not be empty.",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
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
              <Row>
                <Col span={3} offset={9}>
                  <Button type="primary" size="large" htmlType="submit">
                    Apply
                  </Button>
                </Col>
                <Col span={3}>
                  <Button size="large" onClick={ModifiedCancel}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        ) : (
          <>
            <Descriptions
              title="User Info"
              size="default"
              bordered
              column={1}
              style={{ width: 500 }}
            >
              <Descriptions.Item label="Real name">Allen</Descriptions.Item>
              <Descriptions.Item label="Nickname">Dao</Descriptions.Item>
              <Descriptions.Item label="Password">
                {IsPassWordShown ? (
                  <Row>
                    <Col>sdfsfefsefefsfsef</Col>
                    <Col offset={6}>
                      <Button onClick={hidePassword} ghost size="small">
                        Hide
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Button onClick={showPassword} ghost size="small">
                    Show Password
                  </Button>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                b08901057@ntu.edu.tw
              </Descriptions.Item>
              <Descriptions.Item label="Account Type">
                Reviewer
              </Descriptions.Item>
            </Descriptions>
            <div id="modify-button">
              <Button type="primary" size="large" onClick={modifyInfo}>
                Modify
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
  return <Template content={Render} />;
}

export default Settings;
