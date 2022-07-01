import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createFlavour, getProductDependencies } from "./request";


const formName = "createFlavourRecipe";
const CreateRecipe = (props) => {

    const [loader, setLoader] = useState(false);
    const [type, setType] = useState("compound");
    const [deps, setDeps] = useState({
        compounds: [],
        substances: [],
        types: [],
        flavours: [],


    });

    const { id } = useParams();

    const onFinish = (data) => {
        let load = {
            product_id: id,
            name: data.name,
            type: data.type,
            percentage: data.percentage
        }
        let payload = { "object": load }
        makeRequest(setLoader, createFlavour, payload, onSuccess);
    }

    const onSuccess = (data, res) => {
        notify("Recipe Created", res.msg);
        props.onCreated(false);
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
            flavours: data.flavours,

        });


    }
    const selectedType = (value) => {
        setType(value)
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
        // <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    return (
        <ModalComponent mainTitle="Create" subTitle="Component" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
                initialValues={props.availblePercentage}

            >
                <Form.Item name="type" label="Component Type" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Type"
                        options={deps.types}
                        onChange={(event) => selectedType(event)}
                    />
                </Form.Item>
                <Form.Item name="name" label={`Add ${type}`} className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder={`Select ${type}`}
                        options={type === "substance" ? deps.substances : type === "compound" ? deps.compounds : deps.flavours}
                    />
                </Form.Item>

                <Row justify="space-between" >
                    <Col span="10" >

                        <Form.Item name="percentage" label="Add Percentage" placeholder="Percentage" className="da-mb-16"
                        >
                            <Input type="number" max={props.availblePercentage.availValue} />
                        </Form.Item>
                    </Col>
                    <Col span="3"  >
                        <Row align="center" justify="" className="ap-d" >
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




