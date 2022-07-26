import { Col, Row } from 'antd';
import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { getErrorProps, makeRequest, notify, makeRequestStateless } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createItem, getDependencies } from "./component/request";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
const formName = "createReplication";

const CreateReplication = (props) => {
    const userId = Cookies.get("userId");
    const { id } = useParams()


    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        vaping_machine: [],
        heat_setting:[],
        vaping_intensity: [],
        gcms_machine: [],
        icpms_machine: [],
        hplc_machine: [],
        status: []

    });

    const onFinish = (data) => {
        
        let load = {
            labtest_id: id,
            created_by: userId,
            tested_by: userId,
            authorised_by: userId,
            ...data
        }
        
        let payload = { "object": load }
        payload.object["type"] = "product";
        makeRequest(setLoader, createItem, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Product Created", res.msg);
        props.onCreated(res);
    }

    const getSelectFieldsData = () => {
        makeRequestStateless(getDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onDependencySuccess = (data, res) => {
        setDeps({
            vaping_machine: data.vaping_machine,
            heat_setting: data.heat_setting,
            vaping_intensity: data.vaping_intensity,
            gcms_machine: data.gcms_machine,
            icpms_machine: data.icpms_machine,
            hplc_machine: data.hplc_machine,
            status: data.status

        });


    }

    const onError = (err) => {
        let errorList = [];
        errorList['name'] = err.name;
        setErrors(errorList);
    }

    // ------------------------------------
    // Start footer buttons array
    // ------------------------------------
    const footer = [
        <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />,
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------


    return (
        <ModalComponent mainTitle="Create" subTitle="Replication" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={11}>
                        <Form.Item name="replication_no" label="Replication No :" className="da-mb-16"
                            {...getErrorProps(errors['name'])}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                        <Form.Item name="sub_replication_no" label="Sub-Replication No :" className="da-mb-16"
                            {...getErrorProps(errors['name'])}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <hr />
                </Row>
                {/* Row 2 for device */}
                <Row>
                    <Col span={24}>
                        <h5>Laboratory Testing device</h5>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="vaping_machine" label="Vaping Machine" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select"
                                options={deps.vaping_machine}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                        <Form.Item name="gcms_machine" label="GC MS-Machine" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select "
                                options={deps.gcms_machine}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="icpms_machine" label="ICP-MS Machine" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select"
                                options={deps.icpms_machine}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                        <Form.Item name="hplc_machine" label="HP-LC Machine" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select "
                                options={deps.hplc_machine}
                            />
                        </Form.Item>
                    </Col>
                    <hr />
                </Row>

                {/* Row 3 for preconditions */}
                <Row>
                    <Col span={24}>
                        <h5>Test Preconditions</h5>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="testing_methodology" label="Testing Methodology" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select"
                                options={deps.manufacturers}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                        <Form.Item name="coil_age" label="CoilAge" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="vaping_intensity" label="Vaping intensity" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select"
                                options={deps.vaping_intensity}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                        <Form.Item name="heat_setting" label="Heat Seating" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select "
                                options={deps.heat_setting}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={11}>
                        <Form.Item name="power" label="Power (Watt)" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11} offset={2}>
                        <Form.Item name="resistance" label="Resistance (Ohm)" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item name="status" label="Status" className="da-mb-8"
                            {...getErrorProps(errors['role_id'])}
                        >
                            <Select
                                showSearch
                                placeholder="Select "
                                options={deps.status}
                            />
                        </Form.Item>
                    </Col>

                </Row>

            </Form>
        </ModalComponent>
    );
}

export default CreateReplication;


