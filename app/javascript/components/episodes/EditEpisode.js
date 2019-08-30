import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

class EditEpisode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '', title: '', date: '', video: '', description: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  componentDidMount () {
    const { id } = this.props.match.params

    axios.get(`/api/v1/episodes/${id}`)
      .then(response => {
        this.setState({ 
          id: response.data.id,
          title: response.data.title,
          date: response.data.date,
          video: `https://www.youtube.com/watch?v=${response.data.video}`,
          description: response.data.description
         })
      })
      .catch(function (error) {
        console.log(error);
    });
  };
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, () => console.log(this.state));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, title, date, video, description } = this.state
    
    const options = {
      method: 'patch',
      url: `/api/v1/episodes/${id}`,
      data: {
        title: title,
        date: date,
        video: video,
        description: description
      }
    };
    axios(options)
      .then(response => {
        console.log(response);
        this.props.history.push('/admin/episodes');
    })
  };

  render() {
    const { title, date, video, description } = this.state
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12 order-md-1">
            <div class="py-3 text-center">
              <h3>Let's update podcast</h3>
            </div>
          
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item label="Title" required={true}>
                {(<Input name="title" type="text" value={title} onChange={this.handleChange} />)}
              </Form.Item>

              <Form.Item label="Start datetime" required={true}>
                {(<DatePicker showTime className="form-control" name="date" placeholder="Select Time" value={moment(date)} onChange={(e) => { this.setState({ date: moment(e).toJSON() }) }} />)}
              </Form.Item>
              
              <Form.Item label="Youtube url" required={true}>
                {(<Input name="video" type="text" value={video} onChange={this.handleChange} />)}
              </Form.Item>

              <Form.Item label="Description">
                {(<Input.TextArea name="description" type="text" value={description} autosize={true} onChange={this.handleChange} />)}
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" htmlType="submit">
                  Update episode
                </Button>
              </Form.Item>
            </Form>    
          
          </div>
        </div>
      </div>
    )
  }
}

export default EditEpisode
