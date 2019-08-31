import React from 'react'
import { Button, Input, Icon } from 'antd'

class Telegram extends React.Component {
  render() {
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h5 class="mb-3">Telegram</h5>
        <form class="row" action="/admin/telegram" method="POST">
          <div class="col-md-8 mb-3">
            <label for="telegram-token">Bot Token</label>
            <Input.Password id="telegram-token" name="telegram_token"/>
            <small class="text-muted">Status</small>
          </div>  
          <div class="col-md-4 mb-3">
            <label for="telegram-chat-id">Chat ID</label>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              id="telegram-chat-id"
              name="telegram_chat_id"
              />
            <small class="text-muted">Status</small>
          </div>  
          <div class="col-md-8"></div>  
          <div class="col-md-4 btn-group">
            <Button type = "primary">Update</Button>
          </div>  
        </form>  
      </div>
    )
  }
}

export {Telegram}
