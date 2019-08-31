import React from 'react';
import NewEpisodeFormComponent from './NewEpisodeFormComponent'

class NewEpisode extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12 order-md-1">
            <div class="py-3 text-center">
              <h3>Let's create new podcast</h3>
            </div>
            <NewEpisodeFormComponent />
          </div>
        </div>
      </div>
    )
  }
}

export {NewEpisode}
