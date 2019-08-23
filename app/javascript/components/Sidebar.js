import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return(
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo"><a href="/"/></div>
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
            <Menu.Item key="episode_list"><a href="/admin/episodes">List</a></Menu.Item>
            <Menu.Item key="episode_search"><a href="/admin/episodes/search">Search</a></Menu.Item>
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
            <Menu.Item key="telegram"><a href="/admin/set/telegram">Telegram</a></Menu.Item>
            <Menu.Item key="trello"><a href="/admin/set/trello">Trello</a></Menu.Item>
            <Menu.Item key="youtube"><a href="/admin/set/youtube">Youtube</a></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }  
}

export default Sidebar
