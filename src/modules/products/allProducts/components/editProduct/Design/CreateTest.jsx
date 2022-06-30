import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createFlavour, getProductDependencies } from "./request";


const formName = "createProductRecipe";
const CreateTest = (props) => {
    const [loader, setLoader] = useState(false);
    // const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({

        facility: [],
        laboratory: [],
        types: [],

    });


    const onFinish = (data) => {
        let load = {
            product_id: props.product_id,
            laboratory_id: data.laboratory_id,
            type: data.type,
            facility_id: data.facility_id,
            created_by: 1,
            status: "new",

        }

        let payload = { "object": load }
        makeRequest(setLoader, createFlavour, payload, onSuccess);
    }

    const onSuccess = (data, res) => {
        notify("Test Created", res.msg);
        props.onCreated(res);
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
            facility: data.facility,
            laboratory: data.laboratory,
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
        // <CancelButton key="close_button" onClick={() => props.onCreated(false)} />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    return (
        <ModalComponent mainTitle="Create" subTitle="Test" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="product_id" label="Laboratory" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select id"
                        options={deps.types}
                    />
                   
                </Form.Item>

                <Form.Item name="description" label="Add Facility :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="description"
                        options={deps.types}
                    />
                    
                </Form.Item>
                <Form.Item name=" product_length" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select length"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" product_width" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select width"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" product_height" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select height"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" battery_type" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Battery type"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" battery_type_capacity" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select battery type capacity"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" volt_watt_adjustable" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select volt_watt_adjustable"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" e_cig_device_id" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Te_cig_device_idype"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" wick_changeable" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select wick_changeable"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" voltage" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select voltage"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" voltage_lower_range_v" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select voltage_lower_range_v"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" voltage_upper_range_v" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select voltage_upper_range_v"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" coil_resistance" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select coil_resistance"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" microprocessor" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select microprocessor"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" wattage" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select wattage"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" voltage_lower_range_w" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select voltage_lower_range_w"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" coil_composition" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select coil_composition"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" airflow_adjustable" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select airflow_adjustable"
                        options={deps.types}
                    />
                   
                </Form.Item>
                <Form.Item name=" id" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select id"
                        options={deps.types}
                    />
                   
                </Form.Item>



            </Form>
        </ModalComponent>
    );
}

export default CreateTest

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




