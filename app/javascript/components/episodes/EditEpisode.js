import React from 'react';
import EditEpisodeFormComponent from './EditEpisodeFormComponent'

class EditEpisode extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12 order-md-1">
            <div class="py-3 text-center">
              <h3>Let's update podcast</h3>
            </div>
            <EditEpisodeFormComponent id={this.props.match.params.id} />
          </div>
        </div>
      </div>
    )
  }
}

export { EditEpisode }
