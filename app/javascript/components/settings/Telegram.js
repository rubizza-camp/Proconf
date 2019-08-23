import React from 'react'

class Telegram extends React.Component {
  render() {
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h5 class="mb-3">Telegram</h5>
        <form class="row" action="/admin/telegram" method="POST">
          <div class="col-md-8 mb-3">
            <label for="telegram-token">Bot Token</label>
            <input class="form-control" type="text" id="telegram-token" name="telegram_token"/>
            <small class="text-muted">Status</small>
          </div>  
          <div class="col-md-4 mb-3">
            <label for="telegram-chat-id">Chat ID</label>
            <input class="form-control" type="text" id="telegram-chat-id" name="telegram_chat_id"/>
            <small class="text-muted">Status</small>
          </div>  
          <div class="col-md-8"></div>  
          <div class="col-md-4 btn-group">
            <button class="btn btn-primary">Check</button>
            <input type="hidden" name="authenticity_token" id="authenticity_token"/>
            <button class="btn btn-warning" type = "submit">Update</button>
          </div>  
        </form>  
      </div>
    )
  }
}

export default Telegram