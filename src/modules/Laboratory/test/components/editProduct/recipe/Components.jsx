import { Col, Row, Select } from "antd";
import React from "react";

const Components = () => {
    return (
        <>
            <Row>
                <h4>PRODUCT LABLE</h4>
                <span className="da-mt-12" >Not used for recipie calculation</span>
            </Row>

            <Row className="da-mt-24" >
                <Col xs={24} >
                    <h4>Product Basic(INFO)</h4>
                </Col>
                <Col xs={24} >
                    <Select
                        showSearch
                        placeholder="Select Type"
                        options={[]}
                    />
                </Col>
            </Row>
        </>

    )
}
export default Components;