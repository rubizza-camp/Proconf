import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class NewEpisodeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', date: '', video: '', description: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, date, video, description } = this.state

    const options = {
      method: 'post',
      url: `/api/v1/episodes`,
      data: {
        title: title,
        date: date,
        video: video,
        description: description
      }
    };

    axios(options)
      .then(response => {
        if (response.data.error) {
          const errorField = Object.keys(response.data.error)[0]
          message.error(`${errorField} ${response.data.error[errorField]}`);
        }
        else if (response.data) {
          message.success(`New episode "${response.data.title}" successfully created!`);
          this.props.history.push('/admin/episodes')
        }
      })
      .catch(function (error) {
        message.error('Fill all required fields, please');
        console.log(error);
      }); 
  };

  render() {
    const { title, video, description } = this.state
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Title" required={true}>
          {(<Input name="title" type="text" value={title} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Start datetime" required={true}>
          {(<DatePicker showTime className="form-control" name="date" placeholder="Select Time" onChange={(e) => { this.setState({ date: moment(e).toJSON() }) }} />)}
        </Form.Item>
        
        <Form.Item label="Youtube url" required={true}>
          {(<Input name="video" type="text" value={video} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Description">
          {(<Input.TextArea name="description" type="text" value={description} autosize={true} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Create draft episode
          </Button>
        </Form.Item>
      </Form>        
    )
  }
}

export default withRouter(NewEpisodeFormComponent)
