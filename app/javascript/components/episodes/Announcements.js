import React from 'react'
import axios from 'axios';
import { Table, Input, InputNumber, Popconfirm, Drawer, Form, Button, Col, Row, Select, DatePicker, Icon } from 'antd';
import NewAnnouncement from './NewAnnouncement'

const EditableContext = React.createContext();

const { Option } = Select;

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ann: [], editingKey: 0, visible: false };
    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        width: '65%',
        editable: true,
      },
      {
        title: 'Service',
        dataIndex: 'target_resource',
        width: '15%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          <Button>asasdasd</Button>
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Row>
              <Col span={12}>
                <a onClick={() => this.edit(record.id)}>
                  Edit
                </a>
              </Col>
              <Col span={12}>
                <a onClick={() => this.delete(record.id)}>
                  Delete
                </a>
              </Col>
            </Row>
          );
        },
      },
    ];
  }

  isEditing = record => record.id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: 0 });
  };

  delete(id) {
    const options = {
      method: 'delete',
      url: `/api/v1/episodes/${this.props.match.params}/announcements/${id}}`,
    };

    axios(options)
      .then(response => {
        this.getAnnoucements();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount () {
    this.getAnnoucements();
  }

  getAnnoucements () {
    const { id } = this.props.match.params

    axios.get(`/api/v1/episodes/${id}/announcements`)
      .then(response => {
        console.log(response);
        console.log(this.props.match.params);
        this.setState({ ann: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateData = (value) => {
    this.setState({ ann: value })
  }


  save(form, id) {
    form.validateFields((error, announcement) => {
      if (error) {
        return;
      }

      const options = {
        method: 'patch',
        url: `/api/v1/episodes/${this.props.match.params}/announcements/${id}}`,
        data: {
          title: announcement.title,
          target_resource: announcement.target_resource
        }
      };

      axios(options)
      .then(response => {
        this.getAnnoucements();
      })
      .catch(function (error) {
        console.log(error);
      }); 

      this.setState({ editingKey: 0})
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <div>
          <Button type="primary" onClick={this.showDrawer}>
            <Icon type="plus" /> New account
          </Button>
          <Drawer
            title="Create a new announcement"
            width={500}
            onClose={this.onClose}
            visible={this.state.visible}
          >
          <NewAnnouncement onClose={this.onClose} updateData={this.updateData} />
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
            </div>
          </Drawer>
        </div>
        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            bordered
            dataSource={this.state.ann}
            rowKey={ record => record.id }
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel,
            }}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}

const Announcements = Form.create()(EditableTable);

export default Announcements

