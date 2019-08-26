import React from 'react';

class EditEpisode extends React.Component {
    render() {
        const episode = this.props.location.state.currentEpisode
        return (
            <div class="container">
                <div class="py-3 text-center">
                    <h3>Let's update podcast</h3>
                </div>
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Podcast data</h4>
                        <form action={"/episodes/" + episode.id} method="post">
                            <div class="row">
                                <div class="col-md-12 mb-3">
                                    <label for="title">Title</label>
                                    <input class="form-control" name="title" type="text" placeholder={episode.title} onChange={ e => this.onValueChange(e.target.value)}/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 mb-3">
                                    <label for="date">Start datetime</label>
                                    <input class="form-control" name="date" required="" type="datetime" placeholder={episode.date}/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 mb-3">
                                    <label for="video">Youtube stream/video url</label>
                                    <input class="form-control" name="video" required="" type="text" placeholder={"https://www.youtube.com/watch?v="+episode.video}/>
                                </div>
                            </div>
                            <label for="description">Description</label>
                            <textarea class="form-control z-depth-1" name="description" placeholder={episode.description} rows="5"></textarea>
                            <hr class="mb-3"></hr>
                            <button class="btn btn-light btn-lg btn-block" type="submit">Post proConf podcast</button>
                            <input name="_method" type="hidden" value="patch"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditEpisode