import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Popconfirm, message, Icon, Drawer } from 'antd';
import NewEpisodeFormComponent from './NewEpisodeFormComponent';
import EditEpisodeFormComponent from './EditEpisodeFormComponent';

import axios from 'axios';
import moment from 'moment';

class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      showVisible: false,
      editVisible: false
    };
  
    this.handleDelete = this.handleDelete.bind(this);
  }

  showNewDrawer = () => {
    this.setState({
      showVisible: true,
    });
  };

  showEditDrawer = () => {
    this.setState({
      editVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      showVisible: false,
      editVisible: false
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
    const text = 'Are you sure to delete this episode?';

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
          <NewEpisodeFormComponent handler = {this.onClose}/>
        </Drawer>
        
        <Drawer
          title="Edit episode"
          width={720}
          onClose={this.onClose}
          visible={this.state.editVisible}
          placement={"left"}
        >
          <EditEpisodeFormComponent id={85} handler = {this.onClose}/>
        </Drawer>
        
        <table class='table'>
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => {
              return(
                <tr key={episode.id}>
                  <th scope="row" key={episode.id}>{episode.id}</th>
                  <td key={episode.id}>
                    <Link to={{ pathname: `/admin/episodes/${episode.id}` }} >{episode.title}</Link>
                  </td>
                  <td key={episode.id}>{moment(episode.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td key={episode.id}>{episode.status}</td>
                  <td key={episode.id}>
                    <Button.Group>
                      {/* <Link to={`/admin/episodes/${episode.id}/edit`}> */}
                        <Button icon="edit" shape="round" onClick={this.showEditDrawer}>Edit</Button>
                      {/* </Link> */}
                      <Popconfirm
                        placement="left"
                        title={text}
                        okText="Yes"
                        cancelText="No"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => {this.handleDelete(episode.id)}}>
                        <Button icon="delete" type="danger" shape="round">Delete</Button>
                      </Popconfirm>
                    </Button.Group>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Episodes
