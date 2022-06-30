import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { makeRequest, makeRequestStateless, notify } from "@utils/helpers";
import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    const { id } = useParams();


    const onFinish = (data) => {
        let load = {
            product_id: id,
            created_by: 1,
            ...data
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
                <Form.Item name="laboratory_id" label="Laboratory" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Laboratory"
                        options={deps.laboratory}
                    />
                </Form.Item>

                <Form.Item name="facility_id" label="Add Facility :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Facility"
                        options={deps.facility}
                    />
                </Form.Item>
                <Form.Item name="type" label="Add Type :" className="da-mb-16"
                >
                    <Select
                        showSearch
                        placeholder="Select Type"
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




