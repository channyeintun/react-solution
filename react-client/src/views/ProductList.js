import { Table, Space, Modal, Row, Col } from 'antd';
import React from 'react';
import { productService } from '../service';
import { Link } from 'react-router-dom';

const { confirm } = Modal;

export class ProductList extends React.Component {
      state = {
            products: [],
            loading: false
      }
      async componentDidMount() {
            this.update({
                  loading: true
            });
            await productService.getAllProducts()
                  .then(products => {
                        this.update({
                              loading: false,
                              products
                        })
                  })
                  .catch(err=>{
                        this.update({loading:false})
                  });
      }

      update = (newState) => {
            this.setState(prevState => {
                  return {
                        ...prevState,
                        ...newState,
                  }
            })
      }

      deleteHandler = (id) => {
            const that = this;
            confirm({
                  title: "Are you sure to delete?",
                  onOk() {
                        that.update({ loading: true });
                        productService.deleteProductById(id)
                              .then(that.deleteSuccessHandler)
                  }
            })
      }

      deleteSuccessHandler = (res) => {
            console.log('res', res);
            this.update({
                  products: this.state.products.filter(
                        product => product.id !== +res.id
                  ),
                  loading: false
            })
      }

      render() {
            const that = this;
            const {
                  products,
                  loading
            } = this.state;
            let columns = [
                  {
                        title: "Process Title",
                        dataIndex: "processTitle",
                        key: "processTitle"
                  },
                  {
                        title: "Sub Process Name",
                        dataIndex: "subprocessTitle",
                        key: "subprocessTitle"
                  },
                  {
                        title: "Sub Process Version",
                        dataIndex: "subprocessVersion",
                        key: "subprocessTitle"
                  },
                  {
                        title: "Action",
                        render(record, text) {
                              return <Space direction="horizontal">
                                    <Link to={`/edit/${record.id}`} style={styles.editLink}>Edit</Link>
                                    <a style={styles.deleteLink} onClick={() => that.deleteHandler(record.id)}>Delete</a>
                              </Space>
                        }
                  }
            ]
            columns = columns.map(column => {
                  column["onHeaderCell"] = (column) => {
                        return {
                              style: { backgroundColor: '#00a6fb', color: 'white' }
                        }
                  }
                  return column;
            })
            return (
                  <Row gutter={[16,16]}>
                        <Col span={24}>
                              <h1>Product List</h1>
                        </Col>
                        <Col span={24}>
                              <Table columns={columns}
                                    pagination={{ pageSize: 5 }}
                                    bordered
                                    dataSource={products}
                                    rowKey={record => record.id}
                                    loading={loading} />
                        </Col>
                  </Row>
            )
      }
}

const styles = {
      editLink: {
            color: '#00a6fb',
            textDecoration: "underline"
      },
      deleteLink: {
            color: "red",
            textDecoration: "underline"
      }
}