import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { getErrorProps, makeRequest, notify, makeRequestStateless } from "@utils/helpers";
import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { createFlavour, getProductDependencies } from "./request";



const formName = "createFlavour";

const CreateFlavour = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        manufacturers: [],
      

    });


    const onFinish = (data) => {
        
        debugger
        let payload = { "object": data }
        payload.object["type"] = "product";
        makeRequest(setLoader, createFlavour, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Product Created", res.msg);
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
            manufacturers: data.manufacturers,
         

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
        <ModalComponent mainTitle="Create" subTitle="Flavour" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="name" label="Flavour Name :" className="da-mb-16"
                    {...getErrorProps(errors['name'])}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="manufacturer_id" label="Select Manufacturer" className="da-mb-8"
                    {...getErrorProps(errors['role_id'])}
                >
                    <Select
                        showSearch
                        placeholder="Select  Manufacturer"
                        options={deps.manufacturers}
                    />
                </Form.Item>
                <Form.Item name="manufacturer_ref" label="Select Manufacturer refernece" className="da-mb-16"
                    {...getErrorProps(errors['email'])}
                >
                    <Input />
                </Form.Item>


            </Form>
        </ModalComponent>
    );
}

export default CreateFlavour


