import React from 'react';
import axios from 'axios';

class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: []
    };
  }

  getEpisodes() {
    axios.get('/episodes.json')
      .then(response => { 
        this.setState({ episodes: response.data }) 
      })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    this.getEpisodes();
  }

  render() {
    const { episodes } = this.state;
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <div>blablabla</div>
          <ul>
            {episodes.map((episode) => {
              return (
                <li key={episode.id}>
                  {episode.title}
                </li>
              )
            })}
          </ul>
      </div>
    )
  }
}

export default Episodes