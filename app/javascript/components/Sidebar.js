import React from 'react';
import { Link } from 'react-router-dom'
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
            <Menu.Item key="episode_list">
              <Link to="/admin/episodes">
                <span>List</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="episode_search">
              <Link to="/admin/episodes/search">
                <span>Search</span>
              </Link>
            </Menu.Item>
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
            <Menu.Item key="telegram">
              <Link to="/admin/set/telegram">
                <span>Telegram</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="trello">
              <Link to="/admin/set/trello">
                <span>Trello</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="youtube">
              <Link to="/admin/set/youtube">
                <span>Youtube</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }  
}

export default Sidebar
