import "antd/dist/antd.css";
import React, { useState, Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Cookies from "js-cookie";

import {
  GET_USER_BY_EMAIL,
  CHANGE_USER_AVATAR_MUTATION,
  CHANGE_USER_ALL_MUTATION,
  CHECK_USER_PASSWORD,
} from "../../graphql";
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
  TreeSelect,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./Settings.css";
import e from "cors";

const { Title } = Typography;
const { TreeNode } = TreeSelect;

function Settings() {
  const email = Cookies.get("IdeaRep_user_email");
  const [checkPassword, setCheckPassword] = useState("");
  const user = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: email },
  });
  const [update_user_avatar, { avatar_data }] = useMutation(
    CHANGE_USER_AVATAR_MUTATION
  );
  const IsPasswordChecked = useQuery(CHECK_USER_PASSWORD, {
    variables: { email: email, password_hashed: checkPassword }
  });
  useEffect(() => {
    if (
      !IsPasswordChecked.loading &&
      !IsPasswordChecked.error &&
      IsPasswordChecked.data
    ) {
      console.log(IsPasswordChecked.data);
    }
  }, [IsPasswordChecked]);
  const [update_user_all, { loading, error, data }] = useMutation(
    CHANGE_USER_ALL_MUTATION
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [AvatarColor, setAvatarColor] = useState("");
  const [AvatarName, setAvatarName] = useState("");
  const [IsModify, setIsModify] = useState(false);
  const [old_password, setOldPassword] = useState('');
  if (user.loading) return <Template content="Loading" />;
  if (user.error) return <Template content="Error" />;
  if (!user.data) return <Template content="No Data" />;
  if (IsPasswordChecked.loading) return <Template content="Loading" />;
  if (IsPasswordChecked.error) return <Template content="Error" />;
  if (!IsPasswordChecked.data) return <Template content="No Data" />;

  const all_topics = [
    {
      title: "Academic",
      value: "academic",
      children: [
        {
          title: "Physics",
          value: "physics",
        },
        {
          title: "Chemistry",
          value: "chemistry",
        },
        {
          title: "Informatics",
          value: "informatics",
        },
      ],
    },
    {
      title: "Sports",
      value: "sports",
      children: [
        {
          title: "Baseball",
          value: "baseball",
        },
        {
          title: "Table tennis",
          value: "table tennis",
        },
      ],
    },
  ];
  const userId = user.data.get_user_by_email[0]._id;
  const modifyInfo = () => {
    setIsModify(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
  };
  const formItemLayout_woLb = {
    wrapperCol: {
      offset: 8,
    },
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    await update_user_avatar({
      variables: {
        userId: userId,
        avatar_content:
          values.name === undefined
            ? user.data.get_user_by_email[0].info.avatar_content
            : values.name,
        avatar_color:
          values.color === undefined
            ? user.data.get_user_by_email[0].info.avatar_color
            : values.color,
      },
    });
    setAvatarColor(values.color);
    setAvatarName(values.name);
    handleOk();
  };
  const ModifiedFinish = async (values) => {
    console.log("Received values of form: ", values);
    console.log("old_password", old_password);
    // setCheckPassword(values.oldPassword);
    // await IsPasswordChecked.refetch();
    // if (!IsPasswordChecked.data.check_user_password) {
    //   console.log("Password Incorrect");
    //   console.log("loading", loading);
    //   console.log("error", error);
    //   console.log("data", data);
    //   return;
    // }
    // await update_user_all({
    //   variables: {
    //     userId: userId,
    //     realname: values.realname,
    //     region: values.region,
    //     interested_topics: values.interested_topics,
    //     old_password: values.oldPassword,
    //     password_hashed: values.newPassword,
    //   },
    // });
    // setIsModify(false);
  };
  const ModifiedCancel = () => {
    setIsModify(false);
  };

  const Render = (
    <Fragment>
      <div className="title">
        <Title align="left">Settings</Title>
      </div>
      {user.loading ? (
        <p style={{ color: "#ccc" }}>Loading...</p>
      ) : user.error ? (
        <p style={{ color: "#ccc" }}>Error...</p>
      ) : (
        <div>
          <div className="avatar">
            <Avatar
              size={128}
              style={{
                backgroundColor:
                  user.data.get_user_by_email[0].info.avatar_color,
              }}
            >
              {user.data.get_user_by_email[0].info.avatar_content}
            </Avatar>
            <div style={{ paddingBottom: 20 }}></div>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={showModal}>
                Change
              </Button>
            </div>
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
                  <Input
                    type="color"
                    defaultValue={
                      user.data.get_user_by_email[0].info.avatar_color
                    }
                  />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div style={{ float: "left", padding: "0 22px" }}>
            {IsModify ? (
              <div>
                <Title level={3} align="center">
                  Modify Your Account
                </Title>
                <Form {...formItemLayout} onFinish={ModifiedFinish}>
                  <Form.Item
                    name="realname"
                    label="Realname"
                    initialValue={user.data.get_user_by_email[0].info.realname}
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
                    name="region"
                    label="Region"
                    initialValue={user.data.get_user_by_email[0].info.region}
                    rules={[
                      {
                        required: true,
                        message: "This column can not be empty.",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="region" />
                  </Form.Item>

                  <Form.List
                    name="interested_topics"
                    initialValue={
                      user.data.get_user_by_email[0].interested_topics
                    }
                    rules={[
                      {
                        validator: async (_, interested_topics) => {
                          if (
                            !interested_topics ||
                            interested_topics.length < 1
                          )
                            return Promise.reject(
                              new Error("At least 1 interested topics.")
                            );
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <Fragment>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...(index === 0
                              ? formItemLayout
                              : formItemLayout_woLb)}
                            label={index === 0 ? "Interested Topics" : ""}
                            required={true}
                            key={field.key}
                          >
                            <Row>
                              <Col span={20}>
                                <Form.Item
                                  {...field}
                                  rules={[
                                    {
                                      required: true,
                                      message: "This choice can not be empty.",
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        if (
                                          !value ||
                                          getFieldValue(
                                            "interested_topics"
                                          ).filter((e) => e === value).length <=
                                            1
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          "Repeated topics detected."
                                        );
                                      },
                                    }),
                                  ]}
                                  noStyle
                                >
                                  <TreeSelect
                                    placeholder="Please select topic"
                                    treeDefaultExpandAll
                                    dropdownStyle={{
                                      maxHeight: 400,
                                      overflow: "auto",
                                    }}
                                    showSearch
                                  >
                                    {all_topics.map((category) => (
                                      <TreeNode
                                        value={category.value}
                                        title={category.title}
                                        key={category.value}
                                        disabled
                                      >
                                        {category.children.map((topic) => (
                                          <TreeNode
                                            value={topic.value}
                                            title={topic.title}
                                            key={topic.value}
                                          />
                                        ))}
                                      </TreeNode>
                                    ))}
                                  </TreeSelect>
                                </Form.Item>
                              </Col>
                              <Col span={4}>
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                        ))}
                        <Form.Item {...formItemLayout_woLb}>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            Add Interested Topics
                          </Button>
                        </Form.Item>
                        <Row>
                          <Col offset={8}>
                            <Form.ErrorList errors={errors} />
                          </Col>
                        </Row>
                      </Fragment>
                    )}
                  </Form.List>

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
                    <Input.Password
                      size="large"
                      placeholder="password"
                      onChange={(e) => setOldPassword(e.target.value)}/>
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
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
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
                    <Col span={6} offset={8}>
                      <Button type="primary" size="large" htmlType="submit">
                        Apply
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button size="large" onClick={ModifiedCancel}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                  <div style={{ paddingBottom: 20 }}></div>
                </Form>
              </div>
            ) : (
              <div>
                <Descriptions
                  title="User Info"
                  size="default"
                  bordered
                  column={1}
                  style={{ width: 500 }}
                >
                  <Descriptions.Item label="Real name">
                    {user.data.get_user_by_email[0].info.realname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nickname">
                    {user.data.get_user_by_email[0].info.nickname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {user.data.get_user_by_email[0].info.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Type">
                    {user.data.get_user_by_email[0].account_type === 0
                      ? "Admin"
                      : user.data.get_user_by_email[0].account_type === 1
                      ? "Reviewer"
                      : "Normal"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Region">
                    {user.data.get_user_by_email[0].info.region}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expertise">
                    <div>
                      {user.data.get_user_by_email[0].info.expertise.map(
                        (subject) => (
                          <p>
                            <NavLink to={`/topics/${subject}`} rel="noreferrer">
                              {subject}
                            </NavLink>
                          </p>
                        )
                      )}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Interested Topics">
                    <div>
                      {user.data.get_user_by_email[0].interested_topics.map(
                        (subject) => (
                          <p>
                            <NavLink to={`/topics/${subject}`} rel="noreferrer">
                              {subject}
                            </NavLink>
                          </p>
                        )
                      )}
                    </div>
                  </Descriptions.Item>
                </Descriptions>
                <div id="modify-button">
                  <Button type="primary" size="large" onClick={modifyInfo}>
                    Modify
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
  return <Template content={Render} />;
}

export default Settings;