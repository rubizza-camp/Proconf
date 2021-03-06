import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class NewAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', date: '', target_resource: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, date, target_resource } = this.state
    const { id } = this.props.match.params

    const options = {
      method: 'post',
      url: `/api/v1/episodes/${id}/announcements`,
      data: {
        title: title,
        date: date,
        target_resource: target_resource,
      }
    };

    axios(options)
      .then(response => {
        if (response.data.errors) {
          const errorField = Object.keys(response.data.errors)[0]
          message.error(`${errorField} ${response.data.errors[errorField]}`);
        }
        else if (response.data) {
          message.success(`New announcement "${response.data.title}" successfully created!`);
          this.getAnnoucements();
        }
      })
      .catch(function (error) {
        message.error('Fill all required fields, please');
        console.log(error);
      });
    this.props.onClose();
  };

  getAnnoucements () {
    const { id } = this.props.match.params

    axios.get(`/api/v1/episodes/${id}/announcements`)
      .then(response => {
        this.props.updateData(response.data)
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    const { title, date, target_resource } = this.state
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Title" required={true}>
          <Input name="title" type="text" value={title} onChange={this.handleChange} />
        </Form.Item>

        <Form.Item label="Date" required={true}>
          <DatePicker showTime name="date" placeholder="Select Time" onChange={(e) => { this.setState({ date: moment(e).toJSON() }) }} />
        </Form.Item>
        
        <Form.Item label="Service" required={true}>
          <Input name="target_resource" type="text" value={target_resource} onChange={this.handleChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit" >
            Create announcement
          </Button>
        </Form.Item>
      </Form>        
    )
  }
}

export default withRouter(NewAnnouncement)
