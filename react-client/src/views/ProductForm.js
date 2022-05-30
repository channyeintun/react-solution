import { Row, Col, Button, message } from "antd";
import React from "react";
import { productService } from "../service";
import { Choice } from "../component/Choice";
import { withRouter } from "../hoc/withRouter";

function createFormData(char) {
      if (typeof char !== 'string') return;

      const concat_char = str => char + str;

      return {
            title: char.toUpperCase() + " Process",
            subProcesses: [
                  {
                        title: char + "1",
                        versions: ["1.1", "1.2"].map(concat_char)
                  },
                  {
                        title: char + "2",
                        versions: ["2.1", "2.2"].map(concat_char)
                  }
            ]
      };

}

const formData = ['a', 'b', 'c'].map(createFormData);

const getFirstChar = str => str.toLowerCase().split(" ")[0];

const isIncludedIn = value => str => value.toString().includes(getFirstChar(str));

class ProductForm extends React.Component {
      state = {
            selectedProcess: "",
            selectedSubprocess: "",
            selectedSubprocessVersion: "",
            loading: false,
            formData: formData
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
                              message.error(err.message);
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

            const isIncludedInValue = isIncludedIn(value);

            const process = formData.filter(({ title }) => isIncludedInValue(title));

            this.update({
                  selectedProcess: process ? process[0].title : '',
                  selectedSubprocess: value,
                  selectedSubprocessVersion: ''
            });
      }

      onChangeSubprocessVersion = (value) => {
            const { formData } = this.state;

            const firstStr = value.split(".")[0];

            const isIncludedInFirstStr = isIncludedIn(firstStr);

            const filtered = formData.filter(({ title }) => isIncludedInFirstStr(title));

            const process = filtered ? filtered[0] : null;

            const subprocess = process?.subProcesses?.filter(subp => subp.title === firstStr);

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
                        this.props.navigate("/");

                        message.success((params?.id ? "Updated" : "Saved") + " successfully");
                  }).catch(err => {
                        that.update({
                              loading: false
                        });
                        message.error(err.message);
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
                              {this.props.params?.id ? <h1>Edit Product</h1> :
                                    <h1>Process Registration</h1>}
                        </Col>
                        <Col span={24}>
                              <Row gutter={[16, 16]}>
                                    {
                                          formData.map((data, kindex) => {
                                                return (
                                                      <Col span={24} key={kindex}>
                                                            <Choice selectedLabel={selectedProcess}
                                                                  label={data.title}
                                                                  onChange={this.onChangeProcess}
                                                                  isNode={true}
                                                                  uniqueKey={kindex}
                                                                  key={kindex}>
                                                                  {
                                                                        data.subProcesses.map((subprocess, index) => {
                                                                              return (

                                                                                    <Choice selectedLabel={selectedSubprocess}
                                                                                          label={subprocess.title}
                                                                                          onChange={this.onChangeSubprocess}
                                                                                          isNode={true}
                                                                                          uniqueKey={index}
                                                                                          key={index}>
                                                                                          {
                                                                                                subprocess.versions.map((version, jindex) => {
                                                                                                      return (
                                                                                                            <Choice selectedLabel={selectedSubprocessVersion}
                                                                                                                  label={version}
                                                                                                                  onChange={this.onChangeSubprocessVersion}
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
                              <Button type="primary"
                                    style={{ minWidth: "200px" }}
                                    onClick={this.onSave}
                                    loading={loading}>Save</Button>
                        </Col>
                  </Row>
            )
      }
}

export default ProductForm = withRouter(ProductForm);