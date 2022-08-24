import React, { useState } from "react";
import { CancelButton, ModalComponent,  Dropzone } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { Button, Col, Divider, Form, Row, Select } from "antd";
const formName = "import Products";
const ImportProduct = (props) => {
  const [loader, setLoader] = useState(false);
  
  const upload = (files) => {
    const data = new FormData();
    data.append('file', files[0], files.name);
    // makeRequest(setLoader, importUser, data, onSuccess, onError);
  }

  const onSuccess = (res, response) => {
    notify("User Import", response.msg);
    props.onImported(false);
  }

  const onError = (res) => {
    notify("User Import", res.msg);
  }
  const onFinish = (data) => {

   
    // makeRequest(setLoader, createProduct, payload, onSuccess, onError);

}

  // ------------------------------------
  // Start footer buttons array
  // ------------------------------------
  const footer = [
    <CancelButton key="close_button" onClick={() => props.onImported(false)} />
  ];
  // ------------------------------------
  // Eend footer buttons array
  // ------------------------------------

  return (
    <ModalComponent mainTitle="Import" subTitle="Products" visible={true} footer={footer} >
         <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
              <Row>
                <Col sm={24}>
                  <p>To import products please first download and fill template file</p>
                  <p>Then please choase a client name and product type,upload the file and import</p>

                </Col>
                <Divider/>
                <Col sm={24}>
                    <h5>Import File Template</h5>
                </Col>
                <Col sm={24}>
                <Form.Item name="customer_id" label="Save a productimport file template on your PC :" className="da-mb-16"
                >
                    <Button className="importSaveBtn">
                      Save As
                    </Button>
                </Form.Item>
                </Col>
                <Col sm={24}>
                <Form.Item name="customer_id" label="Select a Client :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Customer Name"
                        
                    />
                </Form.Item>
                </Col>
                <Col sm={24}>
                <Form.Item name="customer_id" label="Product Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Customer Name"
                        
                    />
                </Form.Item>
                </Col>
                <Col sm={24}>
                <Form.Item name="customer_id" label="Product Subtype :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Customer Name"
                        
                    />
                </Form.Item>
                </Col>
                <Col sm={24}>
                <Dropzone text="Drag or Click Here To Upload File" multiple={false} files={upload} loader={loader}/>
                </Col>
                </Row>
            </Form>
    </ModalComponent>
  );
}

export default ImportProduct;
