import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createFlavour, getProductDependencies } from "./request";


const formName = "createFlavourRecipe";
const CreateRecipe = (props) => {
    const [loader, setLoader] = useState(false);
    // const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        compounds: [],
        substances: [],
        types: [],

    });


    const onFinish = (data) => {
        let load = {
            flavour_id: props.flavourID,
            name: data.name,
            type: data.type,
            percentage: data.percentage


        }
        let payload = { "object": load }
        makeRequest(setLoader, createFlavour, payload, onSuccess);
    }

    const onSuccess = (data, res) => {
        notify("Recipe Created", res.msg);
        props.onCreated(data.object);
    }

    const getSelectFieldsData = () => {
        makeRequestStateless(getProductDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onDependencySuccess = (data, res) => {

        setDeps({
            compounds: data.compounds,
            substances: data.substances,
            types: data.types,

        });


    }

    // const onError = (err) => {
    //     let errorList = [];
    //     errorList['name'] = err.name;
    //     setErrors(errorList);
    // }

    // ------------------------------------
    // Start footer buttons array
    // ------------------------------------
    const footer = [
        <SaveButton form={formName} key="create_button" htmlType="submit" state={loader} />,
        <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    return (
        <ModalComponent mainTitle="Create" subTitle="Component" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                initialValues={props.availblePercentage}
                onFinish={onFinish}
            >
                <Form.Item name="type" label="Component Type" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Type"
                        options={deps.types}
                    />
                </Form.Item>

                <Form.Item name="name" label="Add name" placeholder="name" className="da-mb-16"
                >
                    <Input />
                </Form.Item>
                <Row justify="space-between" >
                    <Col span="10" >

                        <Form.Item name="percentage" label="Add Percentage" placeholder="Percentage" className="da-mb-16"
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span="3" >
                        <Row align="center" justify="" >
                            <h1>/</h1>
                        </Row>
                    </Col>

                    <Col span="10" >

                        <Form.Item name="availValue" label="Available Percentage :" className="da-mb-16">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>



            </Form>
        </ModalComponent>
    );
}

export default CreateRecipe

// const rules = {
//     name: [
//         { required: true, message: 'Please input your name!', },
//         { min: 3, message: 'Minimum name length is 3', },
//         { max: 100, message: 'Maximum name length is 100', },
//     ],
//     email: [
//         { type: "email", message: "The input is not valid email!" },
//         { required: true, message: "Please input your email!" },
//     ],
//     country: [
//         { required: true, message: 'Please select country!', },
//     ],
// };




