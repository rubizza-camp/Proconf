import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

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

    componentDidMount() {
        this.getEpisodes();
    }

    render() {
        const { episodes } = this.state;
        return (
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <table class='table'>
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((episode) => {
                          return(
                              <tr>
                                <th scope="row" key={episode.id}>{episode.id}</th>
                                <td key={episode.id}>{episode.title}</td>
                                <td key={episode.id}>{moment(episode.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td key={episode.id}>{episode.status}</td>
                                <td key={episode.id}>
                                    <Link to={{ pathname: '/admin/edit_episode', state: {currentEpisode: episode} }}><span>Edit</span></Link>
                                </td>
                              </tr>
                          )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Episodes