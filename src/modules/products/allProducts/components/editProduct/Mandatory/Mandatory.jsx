import { Col, Row } from "antd";
import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
const Mandatory = (props) => {



  return (
    <>
      <div className="da-p-32">
        <Row>
          <Col span={11}>

            <h5>Mandatory Declaration (ELiquid Edevice)</h5>
            <Form  >



              <Form.Item label="Quality Safety Declaration" valuePropName="checked">
                <Switch   />
              </Form.Item>
              <Form.Item label="Child Tamper prof Declaration" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Product Confirmaty Declaration" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="No Risk Declaration" valuePropName="checked">
                <Switch />
              </Form.Item>

            </Form>


          </Col>
          <Col span={11}>
            <h5>Description</h5>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>

            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>

            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>

            <h5>Mandatory Declaration (ELiquids)</h5>
            <Form>



              <Form.Item label="Consistant Design Declaration" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item label="High Purity Declaration" valuePropName="checked">
                <Switch />
              </Form.Item>

            </Form>


          </Col>
          <Col span={11}>
            <h5>Description</h5>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>

            </Form.Item>
            <Form.Item valuePropName="checked">
              <p>If Selected than system will auto generate associated file</p>
            </Form.Item>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default Mandatory;

