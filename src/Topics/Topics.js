import "antd/dist/antd.css";
import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Template from "../Template/Template";
import IdeaCard from "../Template/IdeaCard";

import { Typography, Divider, Card, Row, Col, List } from "antd";
import { PushpinOutlined, BulbOutlined } from "@ant-design/icons";

import {
  TOPICS_QUERY,
  IDEAS_FROM_TOPIC_QUERY
} from '../graphql';

const { Title, Text } = Typography;

function Topics(props) {
  const { topic } = props.match.params;
  const { loading, error, data, refetch, subscribeToMore } = useQuery(TOPICS_QUERY);
  const ideas_from_topic = useQuery(IDEAS_FROM_TOPIC_QUERY, {
    variables: { topic: topic },
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  })

  // const Groups = [
  //   {
  //     name: "Academic",
  //     subtopics: [
  //       {
  //         name: "Physics",
  //       },
  //       {
  //         name: "Chemistry",
  //       },
  //       {
  //         name: "Math",
  //       },
  //       {
  //         name: "Chinese",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Sports",
  //     subtopics: [
  //       {
  //         name: "Baseball",
  //       },
  //       {
  //         name: "Basketball",
  //       },
  //       {
  //         name: "Badminton",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Music",
  //     subtopics: [
  //       {
  //         name: "Piano",
  //       },
  //       {
  //         name: "Violin",
  //       },
  //       {
  //         name: "Drum",
  //       },
  //     ],
  //   },
  // ];
  const Color = ["#1890FF", "#ad71de", "#d65ad0", "#fc9826"];

  if(!topic){
    return <Template content={
      <Fragment>
        <Title>Topics</Title>
        <Divider />
        <Row>
          <Col offset={1} span={18}>
            {loading ? (<p style={{ color: '#ccc' }}>Loading...</p>)
             : error ? (<p style={{ color: '#ccc' }}>Error...</p>)
             : data.get_topics.map((topic) => (
              <Fragment>
                <Card
                  title={
                    <Row gutter={24}>
                      <Col offset={0} style={{ fontSize: 25 }}>
                        <PushpinOutlined />
                      </Col>
                      <Col span={12} offset={0}>
                        {topic.name}
                      </Col>
                    </Row>
                  }
                  bordered={true}
                  headStyle={{
                    backgroundColor: Color[data.get_topics.indexOf(topic) % 4],
                    color: "#FFFFFF",
                    fontSize: 25,
                  }}
                  bodyStyle={{
                    fontSize: 18,
                    lineHeight: 2,
                  }}
                  hoverable
                >
                  <Row>
                    {topic.subtopics.map((subtopic) => (
                      <Fragment>
                        <Col
                          span={8}
                          offset={0}
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: 3,
                          }}
                        >
                          <BulbOutlined />
                          <Text level={4}>
                            {"    "}
                            <NavLink
                              to={`/topics/${subtopic}`}
                              rel="noreferrer"
                              style={{ color: Color[data.get_topics.indexOf(topic) % 4] }}
                            >
                              {subtopic}
                            </NavLink>
                          </Text>
                        </Col>
                      </Fragment>
                    ))}
                  </Row>
                </Card>
                <Divider />
              </Fragment>
            ))}
          </Col>
        </Row>
      </Fragment>
    } />;
  }

  ideas_from_topic.refetch()

  return (
    <Template content={
      <Fragment>
        <Title>{topic}</Title>
        <Divider />
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={ideas_from_topic.loading ? [] : ideas_from_topic.error ? [] : ideas_from_topic.data.get_ideas_by_topic}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 6,
          }}
          renderItem={idea => (
            <List.Item>
              <IdeaCard idea={idea}/>
            </List.Item>
          )}
        />
      </Fragment>
    } />
  );
}

export default Topics;
