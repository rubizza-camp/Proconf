import React from 'react';
import { Link } from "react-router-dom";
import { Table, Divider, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
import axios from 'axios';
import { secondsToTime, timeToSeconds } from './utils';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: null,
      timecodes: [],
      editingId: 0
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.edit = this.edit.bind(this);
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
        console.log(response)
        this.setState({ timecodes: timecodes, episode: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  isEditing = (timecode) => {
    return timecode.id == this.state.editingId
  };

  edit(id) {
    this.setState({ editingId: id });
  }

  save(form, id) {
    form.validateFields((error, timecode) => {
      if (error) {
        return;
      }

      const timecode_timestamp = new Date(new Date(this.state.episode.broadcast_begin).toISOString().getTime() + timeToSeconds(timecode.time) * 1000)
      console.log(timecode_timestamp)

      const options = {
        method: 'patch',
        url: `/api/v1/timecodes/${id}`,
        data: {
          title: timecode.title,
          time: timecode_timestamp
        }
      };

      axios(options)
        .then((response) => {
          if(response.status == 200) {
            const timecodes = this.state.timecodes.filter((timecode) => {
              return timecode.id != id
            });

            timecodes.push({
              id: id,
              title: timecode.title,
              time: timecode.time,
              url: `https://youtu.be/${this.state.episode.video}?t=${timeToSeconds(timecode.time)}`
            });

            this.setState({ timecodes: timecodes, editingId: 0 });
          }
        })
        .catch((error) => {
          console.log(error)
        })
    });
  }

  cancel = () => {
    this.setState({ editingId: 0 });
  };

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        editable: true,
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
        editable: true,
        render: (time, timecode) => (
          <span>
            <a href={timecode.url} target="_blank">{time}</a>
          </span>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, timecode) => {
          const { editingId } = this.state.editingId;
          const editable = this.isEditing(timecode);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, timecode.id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(timecode.id)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <a onClick={() => this.edit(timecode.id)}>
                Edit
              </a>
              <Divider type="vertical" />
              <a>
                <Button type="danger" onClick={this.handleDelete} value={timecode.id}>
                  Delete
                </Button>
              </a>
            </span>
          )
        },
      }
    ].map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    return (
      <EditableContext.Provider value={this.props.form}>
        <div className="row">
          <Table
            components={components}
            rowKey={ timecode => timecode.id }
            columns={columns}
            dataSource={this.state.timecodes}
            pagination={{
              onChange: this.cancel,
            }}
          />
        </div>
      </EditableContext.Provider>
    )
  }
}

const Timecodes = Form.create()(EditableTable);

export default Timecodes
