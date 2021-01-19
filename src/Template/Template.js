import "antd/dist/antd.css";
import React from "react";

import { Layout } from "antd";
import { BackTop } from "antd";

import Navigation from "./Navigation";

const { Header, Content, Footer } = Layout;

function Template(props) {
  // should get from user db
  const Notifications = [];

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#001529",
          height: 64,
          zIndex: 1,
        }}
      >
        {
          <Navigation
            loggined={true}
            reviewer={true}
            notifications={Notifications}
          />
        }
      </Header>

      <Content
        style={{
          padding: "0 50px",
          marginTop: 64,
          background: "#FFFFFF",
        }}
      >
        <div style={{ padding: 24, minHeight: window.innerHeight - 128 }}>
          {props.content}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#000000",
          color: "#FFFFFF",
          height: 64,
        }}
      >
        Ideas Republica{" "}
        <span
          style={{
            display: "inline-block",
            transform: "rotateY(180deg)",
          }}
        >
          &copy;
        </span>{" "}
        2020-2021
      </Footer>

      <BackTop duration={450} visibilityHeight={200} />
    </Layout>
  );
}

export default Template;
