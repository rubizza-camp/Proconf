import React from 'react';
import axios from 'axios';

class Episode extends React.Component {
    state = {
      episode: {
        id: '12'
      }
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
            <div>{episode.id}</div>
            <div>{episode.date}</div>
            <div>{episode.title}</div>
            <div>{episode.description}</div>
          </div>
        )
    }
}

export default Episode