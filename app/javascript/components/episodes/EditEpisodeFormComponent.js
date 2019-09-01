import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, message, Select } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class EditEpisodeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id, title: '', date: '', video: '', description: '',
      authors: [], guests: [], sponsors: [],
      episode_authors: [], episode_guests: [], episode_sponsors: [],
      new_episode_authors: [], new_episode_guests: [], new_episode_sponsors: []
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAuthors = this.handleChangeAuthors.bind(this);
    this.handleChangeGuests = this.handleChangeGuests.bind(this);
    this.handleChangeSponsors = this.handleChangeSponsors.bind(this);
  };

  componentDidMount () {
    const { id } = this.state

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

    axios.get(`/api/v1/episodes/${id}`)
      .then(response => {
        this.setState({ 
          id: response.data.id,
          title: response.data.title,
          date: response.data.date,
          video: response.data.video ? `https://www.youtube.com/watch?v=${response.data.video}` : '',
          description: response.data.description,
          episode_guests: response.data.guests,
          episode_authors: response.data.authors,
          episode_sponsors: response.data.sponsors
         })
         this.state.episode_authors.map(({ id }) => this.state.new_episode_authors.push(id))
         this.state.episode_guests.map(({ id }) => this.state.new_episode_guests.push(id))
         this.state.episode_sponsors.map(({ id }) => this.state.new_episode_sponsors.push(id))
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
    const { id, title, date, video, description } = this.state
    
    const options = {
      method: 'patch',
      url: `/api/v1/episodes/${id}`,
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
          this.props.history.push('/admin/episodes')
          message.success(`Episode "${response.data.title}" successfully edited!`);
        }
      })
      .catch(function (error) {
        message.error('Error while editing');
        console.log(error);
      });
    };

  render() {
    const { form: { getFieldDecorator } } = this.props
    const { title, date, video, description, authors, guests, sponsors, episode_guests, episode_authors, episode_sponsors  } = this.state
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Title" required={true}>
          {(<Input name="title" type="text" value={title} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Start datetime" required={true}>
          {(<DatePicker showTime name="date" placeholder="Select Time" value={ moment(date) } onChange={(e) => { this.setState({ date: moment(e).toJSON() }) }} />)}
        </Form.Item>
        
        <Form.Item label="Youtube url" required={true}>
          {(<Input name="video" type="text" value={video} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Description">
          {(<Input.TextArea name="description" type="text" value={description} autosize={true} onChange={this.handleChange} />)}
        </Form.Item>

        <Form.Item label="Authors">
          {getFieldDecorator('episode_authors', {
            initialValue: episode_authors.map(({ id }) => id.toString()),
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChangeAuthors}
            >
              {authors.map(function (author) {
                return <Option key={author.id}>{author.name}</Option>
              })}
            </Select>
          )}
        </Form.Item>
        
        <Form.Item label="Guests">
          {getFieldDecorator('episode_guests', {
            initialValue: episode_guests.map(({ id }) => id.toString()),
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChangeGuests}
            >
              {guests.map(function (guest) {
                return <Option key={guest.id}>{guest.name}</Option>
              })}
            </Select>
          )}
        </Form.Item>
        
        <Form.Item label="Sponsors">
          {getFieldDecorator('episode_sponsors', {
            initialValue: episode_sponsors.map(({ id }) => id.toString()),
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChangeSponsors}
            >
              {sponsors.map(function (sponsor) {
                return <Option key={sponsor.id}>{sponsor.name}</Option>
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Update episode
          </Button>
        </Form.Item>
      </Form>        
    )
  }
}

const EditEpisodeForm = Form.create({ name: 'edit_episode' })(EditEpisodeFormComponent)

export default withRouter(EditEpisodeForm)
