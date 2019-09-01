import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, message, Select } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class NewEpisodeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', date: '', video: '', description: '', authors: [], guests: [], sponsors: [],
      new_episode_authors: [], new_episode_guests: [], new_episode_sponsors: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAuthors = this.handleChangeAuthors.bind(this);
    this.handleChangeGuests = this.handleChangeGuests.bind(this);
    this.handleChangeSponsors = this.handleChangeSponsors.bind(this);
  };

  componentDidMount () {
      axios.get(`/api/v1/participants`)
          .then(response => {
              this.setState({
                authors: response.data.authors,
                guests: response.data.guests,
                sponsors: response.data.sponsors
              })
          })
          .catch(function (error) {
              console.log(error);
          });
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  };

  handleChangeAuthors(value){
    this.state.new_episode_authors = value;
  };

  handleChangeGuests(value){
    this.state.new_episode_guests = value;
  };

  handleChangeSponsors(value){
    this.state.new_episode_sponsors = value;
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
        description: description,
        authors: this.state.new_episode_authors,
        guests: this.state.new_episode_guests,
        sponsors: this.state.new_episode_sponsors
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
          this.props.handler()
        }
      })
      .catch(function (error) {
        message.error('Error while creating');
        console.log(error);
      }); 
  };

  render() {
    const { title, video, description, sponsors, guests, authors } = this.state
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Title" required={true}>
          {(<Input name="title" type="text" value={title} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Start datetime" required={true}>
          {(<DatePicker showTime name="date" placeholder="Select Time" onChange={(e) => { this.setState({ date: moment(e).toJSON() }) }} />)}
        </Form.Item>
        
        <Form.Item label="Youtube url" required={true}>
          {(<Input name="video" type="text" value={video} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Description">
          {(<Input.TextArea name="description" type="text" value={description} autosize={true} onChange={this.handleChange} />)}
        </Form.Item>

          <Form.Item label="Authors">
              {<Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={this.handleChangeAuthors}
              >
                  {authors.map(function (author) {
                      return <Option key={author.id}>{author.name}</Option>
                  })}
              </Select>}
          </Form.Item>

          <Form.Item label="Guests">
              {<Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={this.handleChangeGuests}
              >
                  {guests.map(function (guest) {
                      return <Option key={guest.id}>{guest.name}</Option>
                  })}
              </Select>}
          </Form.Item>

          <Form.Item label="Sponsors">
              {<Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={this.handleChangeSponsors}
              >
                  {sponsors.map(function (sponsor) {
                      return <Option key={sponsor.id}>{sponsor.name}</Option>
                  })}
              </Select>}
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
