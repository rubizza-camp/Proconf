import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Popconfirm, message, Icon, Drawer, Table } from 'antd';
import NewEpisodeFormComponent from './NewEpisodeFormComponent';

import axios from 'axios';
import moment from 'moment';

class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      currentEpisodeID: '',
      showVisible: false
    };
  
    this.handleDelete = this.handleDelete.bind(this);
  }

  showNewDrawer = () => {
    this.setState({
      showVisible: true
    });
  };

  onClose = () => {
    this.setState({
      showVisible: false,
    });
    this.getEpisodes();
  };

  getEpisodes() {
    axios.get('/api/v1/episodes')
      .then(response => {
        this.setState({ episodes: response.data.reverse() })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getEpisodes();
  }

  handleDelete(id) {
    this.deleteEpisode(id)      
  }

  deleteEpisode(id){
    axios.delete(`/api/v1/episodes/${id}`)
    .then(response => {
      const newEpisodes = this.state.episodes .filter((episode) => episode.id !== id)
      this.setState({
        episodes: newEpisodes
      });
      message.success('Episode successfully destroyed!');
    })
    .catch(function (error) {
      console.log(error);
      message.error("Something went wrong ¯\_(ツ)_/¯");
    });
  }

  render() {
    const { episodes } = this.state;
    const columns = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
        align: 'center'
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '40%',
        render: ( text, episode ) => <Link to={{ pathname: `/admin/episodes/${episode.id}` }} >{text}</Link>,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '20%',
        align: 'center',
        render: ( date ) => moment(date).format('MMMM Do YYYY, h:mm:ss a')
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '15%',
        align: 'center'
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        align: 'center',
        render: (text, episode) => (
          <Button.Group>
            <Link to={`/admin/episodes/${episode.id}/edit`}>
              <Button icon="edit" shape="round">Edit</Button>
            </Link>
            <Popconfirm
              placement="left"
              title={'Are you sure to delete this episode?'}
              okText="Yes"
              cancelText="No"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => {this.handleDelete(episode.id)}}>
              <Button icon="delete" type="danger" shape="round">Delete</Button>
            </Popconfirm>
          </Button.Group>
        ),
      },
    ];
    

    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Link onClick={this.showNewDrawer}>
          <Button type="primary">Add new episode</Button>
        </Link>
        
        <Drawer
          title="Create a new episode"
          width={720}
          onClose={this.onClose}
          visible={this.state.showVisible}
          placement={"right"}
        >
          <NewEpisodeFormComponent handler={this.onClose}/>
        </Drawer>
        
        <Table dataSource={episodes} columns={columns}/>
      </div>
    )
  }
}

export {Episodes}
