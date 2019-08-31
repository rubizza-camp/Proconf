import React from 'react'
import { Button, Row, Col, Select, Typography} from 'antd'

const { Option } = Select;
const { Text } = Typography;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


class Trello extends React.Component {
  render() {
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <Row>
          <Col span={6}>
            <Button type="primary">Trello login</Button>
          </Col>
          <Col span={6}>
            <Text type="secondary">Some info</Text>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a board"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col span={8} offset={1}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a list"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col span={6} offset={1}>
                <Button type="primary" block>Create Webhook</Button>
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
                <Button type="danger" block>Delete Webhook</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export {Trello}
