import "antd/dist/antd.css";
import React from "react";

import { Layout } from "antd";

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
          backgroundColor: "#FFFFFF",
          height: 64,
        }}
      >
        {
          <Navigation
            loggined={false}
            reviewer={true}
            notifications={Notifications}
          />
        }
      </Header>

      <Content
        style={{
          padding: "0 50px",
          marginTop: 64,
          background: "#E0E0E0",
        }}
      >
        <div style={{ padding: 24, minHeight: window.innerHeight - 64 }}>
          {props.content}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#000000",
          color: "#FFFFFF",
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
        2020
      </Footer>
    </Layout>
  );
}

export default Template;
