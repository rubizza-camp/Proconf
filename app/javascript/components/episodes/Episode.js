import React from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Timecodes from '../timecodes/Timecodes'

class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: {}
    };
  }
  
  componentDidMount () {
    const { id } = this.props.match.params

    axios.get(`/api/v1/episodes/${id}`)
      .then(response => {
        this.setState({ episode: response.data })
      })
      .catch(function (error) {
        console.log(error);
    });
  }
  
  render() {
    const { episode } = this.state
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        {episode.status}
        <div class="container">
          <h1 class="my-4">{episode.title}</h1>
          <div class="row">
            <div class="col-md-7">
              { episode.video
                ? <YouTube videoId={episode.video} />
                : null
              }
            </div>
            <div className="col-md-5">
              <p>{episode.description}</p>
              <p>{episode.date}</p>
              <Link to={`/admin/episodes/${episode.id}/announcements`}>
                <Button icon="edit" shape="round">Announcements</Button>
              </Link>
            </div>
          </div>
          <Timecodes id={this.props.match.params}/>
        </div>
      </div>
    )
  }
}

export { Episode }
