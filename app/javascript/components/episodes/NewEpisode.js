import React from 'react';

class NewEpisode extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="py-3 text-center">
          <h3>Let's create new podcast</h3>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Podcast data</h4>
            <form action="/episodes" method="post">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="title">Title</label>
                  <input class="form-control" name="title" placeholder="Write something here..." type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="date">Start datetime</label>
                  <input class="form-control" name="date" required="" type="datetime" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="video">Youtube stream/video url</label>
                  <input class="form-control" name="video" placeholder="" required="" type="text" />
                </div>
              </div>
              <label for="description">Description</label>
              <textarea class="form-control z-depth-1" name="description" placeholder="Write something here..." rows="5"></textarea>
              <hr class="mb-3"></hr>
              <button class="btn btn-light btn-lg btn-block" type="submit">Post proConf podcast</button>
              <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.authenticity_token}></input>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default NewEpisode
