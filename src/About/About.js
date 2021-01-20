import "antd/dist/antd.css";
import React from "react";
import { Typography, Divider, Row, Col, Card, Timeline, Image } from "antd";
import {
  UserSwitchOutlined,
  BarsOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Template from "../Template/Template";
import Jen from "./img/Jen.jpg";
import Chiu from "./img/Chiu.jpg";
import Wu from "./img/Wu.jpg";

const { Title, Text } = Typography;

function About() {
  const Render = (
    <>
      <Title>About</Title>
      <Divider />
      <Row>
        <Col span={18} offset={1}>
          <Card
            title={
              <Row gutter={24}>
                <Col offset={0} span={1} style={{ fontSize: 25 }}>
                  <UserSwitchOutlined />
                </Col>
                <Col span={12}>Concept</Col>
              </Row>
            }
            bordered
            headStyle={{
              backgroundColor: "#1890FF",
              color: "#FFFFFF",
              fontSize: 25,
            }}
            bodyStyle={{
              fontSize: 18,
              lineHeight: 2,
            }}
          >
            <Row>
              <Col offset={1}>
                Ideas Republica is a platform for everyone to share their ideas
                online, dicuss about the topics and the ideas together, and
                finally, make the dream come true. The range of topics contain
                lots of fields, varying from academic, music, and even sports.
                The concept for this platform is help those who are abund in
                creativity, but are not available to implement their ideas, and
                those who are able in one expertise to be excited by those
                creative, interesting, and feasible ideas.
              </Col>
            </Row>
          </Card>
          <Divider />
          <Card
            title={
              <Row gutter={24}>
                <Col offset={0} span={1} style={{ fontSize: 25 }}>
                  <BarsOutlined />
                </Col>
                <Col span={12}>Timeline</Col>
              </Row>
            }
            bordered
            headStyle={{
              backgroundColor: "#ad71de",
              color: "#FFFFFF",
              fontSize: 25,
            }}
            bodyStyle={{
              fontSize: 18,
              lineHeight: 2,
            }}
          >
            <Timeline mode="left">
              <Timeline.Item label="2020-12-17" style={{ fontSize: 18 }}>
                Concept created
              </Timeline.Item>
              <Timeline.Item label="2020-12-21" style={{ fontSize: 18 }}>
                Start Impletation
              </Timeline.Item>
              <Timeline.Item label="2021-01-19" style={{ fontSize: 18 }}>
                Database Completed
              </Timeline.Item>
              <Timeline.Item label="2021-01-20" style={{ fontSize: 18 }}>
                Frontend Completed
              </Timeline.Item>
              <Timeline.Item label="2021-01-21" style={{ fontSize: 18 }}>
                Structure Completed
              </Timeline.Item>
              <Timeline.Item label="2021-01-22" style={{ fontSize: 18 }}>
                Push on Website
              </Timeline.Item>
            </Timeline>
          </Card>
          <Divider />
          <Card
            title={
              <Row gutter={24}>
                <Col offset={0} span={1} style={{ fontSize: 25 }}>
                  <FileTextOutlined />
                </Col>
                <Col span={12}>Usage & Info</Col>
              </Row>
            }
            bordered
            headStyle={{
              backgroundColor: "#d65ad0",
              color: "#FFFFFF",
              fontSize: 25,
            }}
            bodyStyle={{
              fontSize: 18,
              lineHeight: 2,
            }}
          >
            <Row>
              <Col offset={1}>
                <Title level={3}>Usage:</Title>
                <Title level={4}>Types of users:</Title>
                <Text>
                  There are two type of users: Reviewers and Normal Users. For
                  normal users, they can submit the ideas in different fields,
                  and wait for reviewers to vote for the ideas. As for the
                  reviewers, they can decide whether an idea is feasible or not,
                  and vote for the ideas in their expertise. Of course, reviewer
                  also attain the availability to create an idea.
                </Text>
                <Title level={4}>Launch a Project: </Title>
                <Text>
                  For an idea, if half of the reviewers in this field vote for
                  this idea, and half of the reviewers vote for "agree" among
                  them, then a project of this idea is launched. For every
                  project, one or multiple users can accept this project, and
                  then make progress together, finally, make the idea come true!
                  You can click the user button on the left top of the page to
                  check your ideas, interested topics, and ongoing projects.
                </Text>
                <Title level={3}>Infos:</Title>
                <Title level={4}>Implementation: </Title>
                <Text>javascript, css</Text>
                <Title level={4}>modules: </Title>
                <Text>
                  <a href="https://ant.design/">Ant Design </a>,{" "}
                  <a href="https://graphql.org/">GraphQL </a>,{" "}
                  <a href="https://www.apollographql.com/">Apollo GraphQL </a>
                </Text>
              </Col>
            </Row>
          </Card>
          <Divider />
          <Card
            title={
              <Row gutter={24}>
                <Col offset={0} span={1} style={{ fontSize: 25 }}>
                  <UsergroupAddOutlined />
                </Col>
                <Col span={12}>Inventors</Col>
              </Row>
            }
            bordered
            headStyle={{
              backgroundColor: "#fc9826",
              color: "#FFFFFF",
              fontSize: 25,
            }}
            bodyStyle={{
              fontSize: 18,
              lineHeight: 2,
            }}
          >
            <Row>
              <Col span={6} offset={2}>
                <Image width={200} src={Jen} />
                <div style={{ height: 20 }}></div>
                <Title level={4}>Chin Yang Jen</Title>
                <Title level={5}>NTUEE</Title>
              </Col>
              <Col span={6} offset={2}>
                <Image width={200} src={Chiu} />
                <div style={{ height: 20 }}></div>
                <Title level={4}>Hong Hsiang Chiu</Title>
                <Title level={5}>NTUEE</Title>
              </Col>
              <Col span={6} offset={2}>
                <Image width={200} src={Wu} />
                <div style={{ height: 20 }}></div>
                <Title level={4}>Wei Lun Wu</Title>
                <Title level={5}>NTUEE</Title>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={2}></Col>
              <Col span={6} offset={2}></Col>
              <Col span={6} offset={2}></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
  return <Template content={Render} />;
}

export default About;
