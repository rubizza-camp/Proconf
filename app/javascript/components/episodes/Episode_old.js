import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const BUTTON_TYPE = 'button_type'

function getEpisode() {
  console.log('getEpisode()')
  return {
    type: BUTTON_TYPE
  }
}

class Episode extends React.Component {
  render() {

    const { episodes } = this.props;
    const thisEpisodes = episodes.map((episode) => {
      return <li>{episode.id} {episode.title}</li>
    })

    return (
      <React.Fragment>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          Sample_text from props: {this.props.sample_text}
          <button onClick={() => this.props.getEpisode()}>getEpisode</button>
          <br/>
          <ul>{ thisEpisodes }</ul>
        </div>
      </React.Fragment>
    )
  }
}

const structuredSelector = createStructuredSelector({
  episodes: state => state.episodes,
});

const matchDispatchToProps = { getEpisode };

export default connect(structuredSelector, matchDispatchToProps)(Episode);