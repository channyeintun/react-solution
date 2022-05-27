import { Row, Col, Button, message } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useState } from "react";
import { productService } from "../service";

export class RegistrationForm extends React.Component {
      state = {
            selectedProcess: "",
            selectedSubprocess: "",
            selectedSubprocessVersion: "",
            loading: false,
            formData: [
                  {
                        title: "A Process",
                        subProcesses: [
                              {
                                    title: "a1",
                                    versions: ["a1.1", "a1.2"]
                              },
                              {
                                    title: "a2",
                                    versions: ["a2.1", "a2.2"]
                              }
                        ]
                  },
                  {
                        title: "B Process",
                        subProcesses: [
                              {
                                    title: "b1",
                                    versions: ["b1.1", "b1.2"]
                              },
                              {
                                    title: "b2",
                                    versions: ["b2.1", "b2.2"]
                              }
                        ]
                  },
                  {
                        title: "C Process",
                        subProcesses: [
                              {
                                    title: "c1",
                                    versions: ["c1.1", "c1.2"]
                              },
                              {
                                    title: "c2",
                                    versions: ["c2.1", "c2.2"]
                              }
                        ]
                  }
            ]
      }

      componentDidMount() {
            const that = this;
            if (this.props.params?.id) {
                  that.update({ loading: true })
                  productService.getProductById(this.props.params?.id)
                        .then(product => {
                              that.update({
                                    loading: false,
                                    selectedProcess: product.processTitle,
                                    selectedSubprocess: product.subprocessTitle,
                                    selectedSubprocessVersion: product.subprocessVersion
                              })
                        })
                        .catch(err => {
                              that.update({ loading: false })
                        })
            }
      }

      onChangeProcess = (value) => {
            this.update({
                  selectedProcess: value,
                  selectedSubprocess: "",
                  selectedSubprocessVersion: "",
            })
      }

      onChangeSubprocess = (value) => {
            const { formData } = this.state;
            const process = formData.filter(process => value.includes(process.title.toLowerCase().split(" ")[0]));
            this.update({
                  selectedProcess: process ? process[0].title : '',
                  selectedSubprocess: value,
                  selectedSubprocessVersion: ''
            });
      }

      onChangeSubprocessVersion = (value) => {
            const { formData } = this.state;
            const splitted = value.split(".")[0];
            const filtered = formData.filter(process => splitted.includes(process.title.toLowerCase().split(" ")[0]));
            const process = filtered ? filtered[0] : null;
            const subprocess = process?.subProcesses?.filter(subp => subp.title === splitted);
            this.update({
                  selectedProcess: process ? process.title : '',
                  selectedSubprocess: subprocess ? subprocess[0].title : '',
                  selectedSubprocessVersion: value
            });
      }

      onSave = () => {
            const { selectedProcess, selectedSubprocess, selectedSubprocessVersion } = this.state;
            if (selectedProcess && selectedSubprocess && selectedSubprocessVersion) {
                  this.update({ loading: true });
                  const that = this;
                  const { params } = this.props;
                  productService[params?.id ? "updateProduct" : "saveProduct"]({
                        id: params?.id,
                        processTitle: selectedProcess,
                        subprocessTitle: selectedSubprocess,
                        subprocessVersion: selectedSubprocessVersion,
                  }).then(product => {
                        that.update({
                              loading: false,
                              selectedProcess: '',
                              selectedSubprocess: '',
                              selectedSubprocessVersion: ''
                        });
                        message.success((params?.id ? "Updated" : "Saved") + " successfully");
                  }).catch(err => {
                        that.update({
                              loading: false
                        });
                        message.error("Failed to save")
                  })
            }
            else {
                  message.warn("Select Process, Subprocess and version")
            }
      }

      update = (newState) => {
            this.setState(prevState => {
                  return {
                        ...prevState,
                        ...newState
                  }
            })
      }

      render() {
            const {
                  selectedProcess,
                  selectedSubprocess,
                  selectedSubprocessVersion,
                  formData,
                  loading
            } = this.state;
            return (
                  <Row gutter={[16, 16]}>
                        <Col span={24}>
                              {this.props.params?.id ? <h1>Edit Product</h1> : <h1>Process Registration</h1>}
                        </Col>
                        <Col span={24}>
                              <Row gutter={[16, 16]}>
                                    {
                                          formData.map((data, kindex) => {
                                                return (
                                                      <Col span={24} key={kindex}>
                                                            <Choice selected={selectedProcess}
                                                                  label={data.title}
                                                                  onChange={this.onChangeProcess}
                                                                  isNode={true}
                                                                  uniqueKey={kindex}
                                                                  key={kindex}>
                                                                  {
                                                                        data.subProcesses.map((subprocess, index) => {
                                                                              return (

                                                                                    <Choice selected={selectedSubprocess}
                                                                                          label={subprocess.title}
                                                                                          onChange={this.onChangeSubprocess}
                                                                                          isNode={true}
                                                                                          uniqueKey={index}
                                                                                          key={index}>
                                                                                          {
                                                                                                subprocess.versions.map((version, jindex) => {
                                                                                                      return (
                                                                                                            <Choice selected={selectedSubprocessVersion}
                                                                                                                  label={version}
                                                                                                                  onChange={this.onChangeSubprocessVersion}
                                                                                                                  isNode={false}
                                                                                                                  uniqueKey={jindex}
                                                                                                                  key={jindex}></Choice>
                                                                                                      )
                                                                                                })
                                                                                          }
                                                                                    </Choice>
                                                                              )
                                                                        })
                                                                  }
                                                            </Choice>
                                                      </Col>
                                                )
                                          })
                                    }
                              </Row>
                        </Col>
                        <Col>
                              <Button type="primary" style={{ minWidth: "200px" }} onClick={this.onSave} loading={loading}>Save</Button>
                        </Col>
                  </Row>
            )
      }
}

const styles = {
      ul: {
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: '20px',
      },
      wrapper: {
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: '20px',
            paddingLeft: "60px"

      }
}

function Choice({
      selected,
      onChange,
      label,
      children,
      isNode,
      uniqueKey
}) {
      const [visible, setVisible] = useState(false);
      const toggler = visible ? <MinusCircleOutlined
            style={{ color: '#00a6fb' }}
            onClick={
                  () => setVisible(false)
            } /> : <PlusCircleOutlined
            style={{ color: '#00a6fb' }}
            onClick={
                  () => setVisible(true)
            } />;
      return (
            <Row key={uniqueKey}>
                  <Col span={24}>
                        <Row gutter={[16, 16]}>
                              <Col>{isNode ? toggler : null}</Col>
                              <Col>
                                    <Checkbox checked={selected === label}
                                          onChange={() => onChange(label)}>{label}</Checkbox>
                              </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                              <Col span={24}>
                                    {visible ? <div style={styles.wrapper}>
                                          {children}
                                    </div> : null}
                              </Col>
                        </Row>
                  </Col>
            </Row>);
}