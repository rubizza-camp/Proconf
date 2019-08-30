import React from 'react';
import { Link } from "react-router-dom";
import { Table, Divider } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import secondsToTime from './utils';

class Timecodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timecodes: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.persist()
    event.preventDefault()
    const id = event.target.value
    axios
      .delete("/api/v1/timecodes/" + id)
      .then((response) => {
        response.status == 200
        ? this.setState({ timecodes: this.state.timecodes.filter((timecode) => {
              return timecode.id != id
            })
          })
        : null
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    const { id } = this.props.id
    console.log(id)

    axios
      .get(`/api/v1/episodes/${id}`)
      .then((response) => {
        const timecodes = response.data.timecodes.map((timecode) => {
          const timecode_time = (new Date(timecode.time).getTime() - new Date(response.data.broadcast_begin).getTime()) / 1000;
          const time = secondsToTime(timecode_time);
          return {
            id: timecode.id,
            title: timecode.title,
            time: `${time.h}:${time.m}:${time.s}`,
            url: `https://youtu.be/${response.data.video}?t=${timecode_time}`
          }
        });
        this.setState({ timecodes: timecodes })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (title, timecode) => (
          <span>
            <a href={timecode.url} target="_blank">{title}</a>
          </span>
        )
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        render: (time, timecode) => (
          <span>
            <a href={timecode.url} target="_blank">{time}</a>
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, timecode) => (
          <span>
            <a>
              <Button>
                Edit
              </Button>
            </a>
            <Divider type="vertical" />
            <a>
              <Button type="danger" onClick={this.handleDelete} value={timecode.id}>
                Delete
              </Button>
            </a>
          </span>
        ),
      }
    ]

    return (
      <div class="row">
        <Table rowKey={ record => record.id } columns={columns} dataSource={this.state.timecodes} />
      </div>
    )
  }
}

export default Timecodes
