import React from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'
import { Button, Steps, message } from 'antd'
import { Timecodes } from '../timecodes/Timecodes'

const { Step } = Steps;

class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: {},
      current: 0
    };
  }
  
  componentDidMount () {
    const { id } = this.props.match.params

    axios.get(`/api/v1/episodes/${id}`)
      .then(response => {
        this.setState({ episode: response.data, current: this.getCurrent(response.data.status)})
      })
      .catch(function (error) {
        console.log(error);
    });
  }
  
  getStatus (status_id) {
    switch(status_id) {
      case 0:
        return 'draft';
      case 1:
        return 'announced';
      case 2:
        return 'online';
      case 3:
        return 'finished';
      default:
        return 'draft';
    }
  }
  
  getCurrent (status) {
    switch(status) {
      case 'draft':
        return 0;
      case 'announced':
        return 1;
      case 'online':
        return 2;
      case 'finished':
        return 3;
      default:
        return 0;
    }
  }
  
  changeEpisodeStatus(method_path, diff) {
    const { id } = this.props.match.params
    
    const options = {
      method: 'post',
      url: `/api/v1/episodes/${id}/${method_path}`
    };

    axios(options)
      .then(response => {
        const newStatus = response.data.status
        const currStatus = this.getStatus(this.state.current)
        const expStatus = this.getStatus(this.state.current  + diff)
        
        if (newStatus != currStatus ) {
          message.success(`Status successfully changed from ${currStatus} for ${expStatus}`)
          this.setState({ current: this.state.current + diff });
        }
        else if (response.data) {
          message.warning(`Can't change "${currStatus}" to ${expStatus}`);
        }
      })
      .catch(function (error) {
        message.error('Error while status changing');
        console.log(error);
      });

  }

  nextStatus() {
    const current = this.state.current
    const method = this.nextMethod(current)
    if ( method != '' ) {
      this.changeEpisodeStatus(method, 1)
    }
    else {
      message.warning(`Can't go from ${this.getStatus(current)} to ${this.getStatus(current + 1)} status`)
    }
  }

  nextMethod(status_id) {
    switch(status_id) {
      case 0:
        return 'to_announcement';
      case 1:
        return 'to_online';
      case 2:
        return 'to_finished';
      default:
        return '';
    }
  }

  prevStatus() {
    const current = this.state.current
    const method = this.prevMethod(current)
    if ( method != '' && current != 3 ) {
      this.changeEpisodeStatus(method, -1)
    }
    else {
      message.warning(`Can't go from ${this.getStatus(current)} to ${this.getStatus(current - 1)} status`)
    }
  }

  prevMethod(status_id) {
    switch(status_id) {
      case 2:
        return 'to_announcement';
      case 3:
        return 'to_online';
      default:
        return '';
    }
  }

  render() {
    const { episode, current } = this.state;
    
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <div className="container">
          <div className="row">
            <div className="py-3 text-center">
              <h3>Episode status</h3>
            </div>
            
            <Steps current={this.state.current}>
              <Step title="Draft" />
              <Step title="Announcement"/>
              <Step title="Online"/>
              <Step title="Finished"/>
            </Steps>
          </div>

          <div className="row">
            <div className="my-4 steps-action">
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prevStatus()}>
                  Previous status
                </Button>
              )}
              {current < 3 && (
                <Button type="primary" onClick={() => this.nextStatus()}>
                  Next status
                </Button>
              )}
            </div>
          </div>

          <Link to={`/admin/episodes/${episode.id}/announcements`}>
            <Button icon="edit" shape="round">Announcements</Button>
          </Link>
            
          <h1 className="my-4">{episode.title}</h1>

          <div className="row">
            <div className="col-md-7">
              { episode.video
                ? <YouTube videoId={episode.video} />
                : null
              }
            </div>
        
            <div className="col-md-5">
              <h5>Date: {episode.date}</h5>
              <h4>Descr: {episode.description}</h4>
            </div>
          </div>
          
          <div className="col-md-8 col-md-offset-2">
            <Timecodes id={this.props.match.params}/>
          </div>
        </div>
      </div>
    )
  }
}

export { Episode }
