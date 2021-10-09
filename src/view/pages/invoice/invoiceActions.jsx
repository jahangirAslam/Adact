import React, { useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Drawer,
  Form,
} from "antd";
import {
  RiMailSendLine,
  RiAttachmentLine,
  RiDownload2Line,
  RiPrinterLine,
  RiCloseFill,
} from "react-icons/ri";

export default function InvoiceActions(props) {
  const [visible, setVisible] = useState(false);

  const sendMail = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Card className="da-mb-32">
      <Button
        onClick={sendMail}
        className="da-mb-16"
        type="primary"
        icon={<RiMailSendLine className="remix-icon" />}
        block
      >
        Send Invoice
      </Button>

      <Button
        className="da-mb-16"
        type="ghost"
        icon={<RiDownload2Line className="remix-icon" />}
        block
      >
        Download
      </Button>

      <Button
        onClick={props.print}
        type="ghost"
        icon={<RiPrinterLine className="remix-icon" />}
        block
      >
        Print
      </Button>

      <Drawer
        className="da-drawer-submit"
        title="Send Invoice"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={false}
        bodyStyle={{ paddingBottom: 80 }}
        closeIcon={
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="from"
                label="From"
                rules={[
                  { required: true, message: "Please enter email address" },
                ]}
              >
                <Input placeholder="Please enter email address" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="to"
                label="To"
                rules={[
                  { required: true, message: "Please enter email address" },
                ]}
              >
                <Input placeholder="Please enter email address" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="message"
                label="Messsage"
                rules={[
                  {
                    required: true,
                    message: "Please enter your message",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Row align="middle" className="da-mb-24">
                <RiAttachmentLine className="remix-icon da-mr-8" size={16} />
                <p className="da-m-0 da-text-color-black-80">invoice.pdf</p>
              </Row>

              <Button onClick={onClose} type="text" className="da-mr-8">
                Cancel
              </Button>

              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Card>
  );
}