import React from 'react';
import { Link } from 'react-router-dom'
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
                            <th scope="col">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((episode) => {
                          return(
                              <tr>
                                <th scope="row" key={episode.id}>{episode.id}</th>
                                <td key={episode.id}>{episode.title}</td>
                                <td key={episode.id}><Link to="#"><span>Edit</span></Link></td>
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