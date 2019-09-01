import React from 'react'
import { Button, Input, Icon, message, Form, Row, Col } from 'antd'

import axios from 'axios';

class Telegram extends React.Component {
  constructor(props) {
    super(props);
    this.state = { telegram_chat_id: '', telegram_token: '' };
  
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCredentials();
  }

  getCredentials() {
    axios.get('/api/v1/telegram')
      .then(response => {
        this.setState({ telegram_chat_id: response.data.telegram_chat_id, telegram_token: response.data.telegram_token })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(event) {
    console.log(event.target)
    console.log(this.state)
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const { telegram_chat_id, telegram_token } = this.state

    const options = {
      method: 'post',
      url: `/api/v1/telegram`,
      data: {
        telegram_chat_id: telegram_chat_id,
        telegram_token: telegram_token
      }
    };

    axios(options)
      .then(response => {
        const data = response.data
        if (data.error) {
          message.error(data.error);
        }
        else if (data.message) {
          message.success(data.message);
        }
      })
      .catch(function (error) {
        message.error('Error: Network Error');
        console.log(error);
      }); 
  };
  
  render() {
    const { telegram_chat_id, telegram_token } = this.state
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h5 class="mb-3">Telegram</h5>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item label="Bot Token">
            <Input.Password
              id="telegram-token"
              name="telegram_token"
              value={telegram_token}
              onChange={this.handleChange}
            />
          </Form.Item>
    
          <Form.Item label="Chat ID">
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              id="telegram-chat-id"
              name="telegram_chat_id"
              value={telegram_chat_id}
              onChange={this.handleChange}
            />
          </Form.Item>
    
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
     
      </div>
    )
  }
}

export {Telegram}
