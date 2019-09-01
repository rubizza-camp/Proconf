import React from 'react'
import { Button, Row, Col, Select, Typography, Cascader, message} from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

const { Option } = Select;
const { Text } = Typography;


class Trello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      idModel: '',
      idList: ''
    };
    this.webhookClick = this.webhookClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentDidMount () {
    this.getAnnoucements();
  }

  getAnnoucements () {
    axios.get(`/api/v1/users_boards`)
      .then(response => {
        console.log(response.data);
        this.setState({ lists: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange = (value, selectedOptions) => {
    this.setState({ idModel: value[0], idList: value[1] })
  }

  webhookClick () {
    const options = {
      method: 'post',
      url: '/api/v1/webhooks/create',
      data: {
        idModel: this.state.idModel,
        idList: this.state.idList
      }
    }
    axios(options)
      .then(response => {
        console.log(response.data)
        if (response.data.webhook.error) {
          message.error(`${response.data.webhook.error} ${response.data.webhook.message}`);
        }
        else if (response.data.webhook.active) {
          message.success(`Webhook "${response.data.webhook.idModel}" successfully created!`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete () {
    const options = {
      method: 'delete',
      url: '/api/v1/webhooks/delete'
    }
    axios(options)
      .then(response => {
        console.log(response.data)
        if (response.data == 'ERROR') {
          message.error(`ERROR`);
        }
        else if (response.data == 'ok') {
          message.success(`Webhook  successfully deleted!`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { lists } = this.state
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Row>
          <Col span={6}>
            <a href="/auth/trello" target="_blank">
              <Button type="primary">Trello login</Button>
            </a>
          </Col>
          <Col span={6}>
            <Text type="secondary">Some info</Text>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={17}>
                <Cascader options={lists} onChange={this.onChange} placeholder="Please select" />
              </Col>
              <Col span={6} offset={1}>
                <Button type="primary" block onClick={this.webhookClick}>Create Webhook</Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={12} offset={12}>
                <Text type="secondary">Webhook now confimed on this board.</Text>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6} offset={18}>
                <Button type="danger" onClick={this.handleDelete} block>Delete Webhook</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export {Trello}
