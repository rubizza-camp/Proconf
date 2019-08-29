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

    axios.get(`/episodes/${id}.json`)
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
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });

    const data = new FormData(e.target);

    const { id } = this.state

    debugger
    axios.patch(`/episodes/${id}`, data)


    // fetch('//form-submit-url', {
    //   method: 'PATCH',
    //   body: data,
    // });
  };

  render() {
    const { id, title, date, video, description } = this.state
    return (
      <div class="container">
        <div class="py-3 text-center">
          <h3>Let's update podcast</h3>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8 order-md-1">
          
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
                Post proConf podcast
              </Button>
            </Form.Item>
          </Form>    
            
            
            {/* <form action={"/episodes/" + id} method="post"> */}
              {/* <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="title">Title</label>
                  <input class="form-control" name="title" type="text" value={title} onChange={this.handleChange}/>
                </div>
              </div> */}
              {/* <div class="row"> */}
                {/* <div class="col-md-12 mb-3"> */}
                  {/* <label for="date">Start datetime</label> */}
                  {/* <input class="form-control" name="date" required="" type="datetime" value={date} onChange={this.handleChange}/> */}
                  {/* <DatePicker showTime className="form-control" size='large' name="date" placeholder="Select Time" value={moment(date)} onChange={this.handleChange} /> */}
                {/* </div> */}
              {/* </div> */}
              {/* <div class="row"> */}
                {/* <div class="col-md-12 mb-3"> */}
                  {/* <label for="video">Youtube stream/video url</label> */}
                  {/* <input class="form-control" name="video" required="" type="text" value={video} onChange={this.handleChange}/> */}
                {/* </div> */}
              {/* </div> */}
              {/* <label for="description">Description</label> */}
              {/* <textarea class="form-control z-depth-1" name="description" value={description} rows="5" onChange={this.handleChange}></textarea> */}
              {/* <hr class="mb-3"></hr> */}
              {/* <button class="btn btn-light btn-lg btn-block" type="submit">Post proConf podcast</button> */}
              {/* <input name="_method" type="hidden" value="patch"/> */}
            {/* </form> */}
          </div>
        </div>
      </div>
    )
  }
}

export default EditEpisode
