
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Breadcrumb } from 'antd';
import { Route, Switch } from 'react-router-dom'
import Sidebar from './Sidebar'
import Telegram from './settings/Telegram'
import Trello from './settings/Trello'
import Youtube from './settings/Youtube'
import Episode from './episodes/Episode'
import Episodes from './episodes/Episodes'
// import EpisodeSearch from './episodes/Search'
import EditEpisode from './episodes/EditEpisode';
import HomePage from './Home'
import NewEpisode from './episodes/NewEpisode';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar/>
        <Layout>
          <Header style={{ background: '#002140', padding: 0 }} />
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            
              <Switch>
                <Route exact path="/admin" component={HomePage} />
                
                <Route path="/admin/episode" component={Episode} />
                <Route path="/admin/new_episode" component={NewEpisode} />
                <Route path="/admin/edit_episode" component={EditEpisode} />
                <Route path="/admin/episodes" component={Episodes} />
                {/* <Route path="/admin/episodes/search" component={EpisodeSearch} /> */}
                
                <Route path="/admin/set/telegram" component={Telegram} />
                <Route path="/admin/set/trello" component={Trello} />
                <Route path="/admin/set/youtube" component={Youtube} />
              </Switch>
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App
          