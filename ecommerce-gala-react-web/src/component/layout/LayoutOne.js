import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import "./LayoutOne.css";

const { Header, Sider, Content } = Layout;
const LayoutOne = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
//   menu = []
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Customer",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Product",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "Product",
            }
          ]}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems : "center",
                justifyContent:"space-between"
            }}
        >
            <MenuUnfoldOutlined
                style={{fontSize:26,paddingLeft:20}}
                onClick={()=>setCollapsed(!collapsed)}
            />
            <div
                style={{
                    paddingRight:10,
                }}
            >
                <div>
                    Dara
                </div>
            </div>
        </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height:"90vh"
          }}
        >
          <div>Block content</div>  
          {props.childreen}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutOne;
