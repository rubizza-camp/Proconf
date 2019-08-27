import React from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';


class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: {
        id: '12',
        video: 'oIMsxYm3BXc'  
      }
    };
  }
  
  componentDidMount () {
    const { id } = this.props.match.params

    axios.get(`/episodes/${id}.json`)
      .then(response => {
        this.setState({ episode: response.data })
      })
      .catch(function (error) {
        console.log(error);
    });
  }
  
  render() {
    const { episode } = this.state
    // const video_id = youtube_parser(episode.video)
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        {(function() {
          switch(episode.status) {
            case 'draft':
              return <div>Draft</div>;
            case 'announcement':
              return <div>Announcement</div>;
            case 'finished':
              return <div>Finished</div>;
            default:
              return <div>I don't know "{episode.status}" status</div>;
            }
          })()}
        <div class="container">
          <h1 class="my-4">{episode.title}</h1>
          <div class="row">
            <div class="col-md-7">
              { episode.video
                ? <YouTube videoId={episode.video} />
                : null
              }
            {/* <iframe class="youtube-video" src={episode.video}></iframe> */}
            </div>
            <div class="col-md-5">
              <p>{episode.description}</p>
              <p>{episode.date}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Episode