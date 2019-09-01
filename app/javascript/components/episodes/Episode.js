import React from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'
import { Button, Steps, message, Row, Col, Typography} from 'antd'
import { Timecodes } from '../timecodes/Timecodes'

import moment from 'moment';

const { Step } = Steps;
const { Title } = Typography;
const { Text } = Typography;

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

  getPodcastDataFromYoutube () {

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
          if ( newStatus == 'online' || newStatus == 'finished' ) {
            const options = {
              method: 'post',
              url: `/api/v1/episodes/${id}/update_youtube_data`
            };
            axios(options)
              .then(response => {
              if (response.status == 200) {
                if ( newStatus == 'online' ) {
                  message.success(`Youtube podcast status and broadcast begin date updated`)
                }
                else {
                  message.success(`Youtube podcast status, broadcast begin and end dates updated`)
                }
              }  
            }) 
          }
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

  render() {
    const { episode, current } = this.state;
    
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Row >
            <Title level={4} align="center">
              Episode status
            </Title>
            
            <Steps current={this.state.current} >
              <Step title="Draft" />
              <Step title="Announcement"/>
              <Step title="Online"/>
              <Step title="Finished"/>
            </Steps>
          </Row>

          <Row>
              {current < 3 && (
                <Button type="primary" onClick={() => this.nextStatus()}>
                  Next status
                </Button>
              )}
          </Row>
          <br />
          <Row>
            <Col span={4} offset={20}>
              <Link to={`/admin/episodes/${episode.id}/announcements`}>
                <Button icon="edit" shape="round">Announcements</Button>
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Title level={2} align="center">
              {episode.title}
            </Title>
          </Row>

          <Row>
            <Col span={14}>
              { episode.video
                ? <YouTube videoId={episode.video}/>
                : null
              }
            </Col>
            <Col span={10}>
              <Row>
                <Text >
                  Descr: {episode.description}
                </Text>
              </Row>
              <br />
              <br />
              <Row>
                <Text>
                  Date: {moment(episode.date).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
              </Row>
            </Col>
          </Row>
          <br />
          <Row align="center">
            
            <Timecodes id={this.props.match.params} align="center"/>
            
          </Row>
      </div>
    )
  }
}

export { Episode }
