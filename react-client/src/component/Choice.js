import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Checkbox, Row, Col } from "antd";

export function Choice({
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

Choice.propTypes = {
      isNode: PropTypes.bool,
      selected: PropTypes.string.isRequired,
      uniqueKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
      ]),
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
      ])
}

Choice.defaultProps = {
      isNode: false
}

const styles = {
      wrapper: {
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: '20px',
            paddingLeft: "60px"

      }
}