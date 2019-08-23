
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            
            <SubMenu
              key="episodes"
              title={
                <span>
                  <Icon type="desktop" />
                  <span>Episodes</span>
                </span>
              }
            >
              <Menu.Item key="episode_list">List</Menu.Item>
              <Menu.Item key="episode_search">Search</Menu.Item>
            </SubMenu>
            
            <SubMenu
              key="social"
              title={
                <span>
                  <Icon type="setting" />
                  <span>Social settings</span>
                </span>
              }
            >
              <Menu.Item key="telegram">Telegram</Menu.Item>
              <Menu.Item key="trello">Trello</Menu.Item>
              <Menu.Item key="youtube">Youtube</Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App
          