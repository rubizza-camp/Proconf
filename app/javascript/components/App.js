import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Breadcrumb } from 'antd';
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute';
import { authenticationService } from './services';
import { LoginPage } from './LoginPage';
import { Sidebar } from  './Sidebar'
import { Telegram } from './settings/Telegram'
import { Trello } from './settings/Trello'
import { Youtube } from  './settings/Youtube'
import { Episode } from './episodes/Episode'
import { Episodes } from './episodes/Episodes'
import { EditEpisode } from  './episodes/EditEpisode';
import { NewEpisode } from   './episodes/NewEpisode';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
}

componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
}

logout() {
    authenticationService.logout();
    history.push('/login');
}

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar/>
        <Layout>
          <Header style={{ background: '#002140', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>
                {this.state.currentUser &&
                   <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                }
              </Breadcrumb.Item>
            </Breadcrumb>
            <Switch>
              <Route path="/login" component={LoginPage} />

              <PrivateRoute path="/admin/episodes/:id/edit" component={EditEpisode} />
              <PrivateRoute path="/admin/episodes/new" component={NewEpisode} />
              <PrivateRoute path="/admin/episodes/:id" component={Episode} />
              
              <PrivateRoute path="/admin/set/telegram" component={Telegram} />
              <PrivateRoute path="/admin/set/trello"   component={Trello} />
              <PrivateRoute path="/admin/set/youtube"  component={Youtube} />
              <PrivateRoute path="/admin" component={Episodes} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App
