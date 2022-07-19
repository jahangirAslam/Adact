import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { createLocation, getLocationDependencies } from "../requests";
import { useParams } from "react-router-dom";


const formName = "createLocation";

const CreateLocation = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deps, setDeps] = useState({
        countries: []
    });
    const { id } = useParams()
    const onFinish = (data) => {
        const load = {
            companies_id: id,
            ...data
        }
        let payload = { "object": load }
        debugger
        payload.object["type"] = props.type;
        makeRequest(setLoader, createLocation, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Contact Created", res.msg);
        props.onCreated(res);
    }

    const getSelectFieldsData = () => {
        makeRequestStateless(getLocationDependencies, null, onDependencySuccess, null);
    }

    useEffect(() => {
        getSelectFieldsData();
        // eslint-disable-next-line
    }, []);

    const onDependencySuccess = (data, res) => {
        setDeps({
            countries: data.countries,
        });
    }


    const onError = (err) => {
        let errorList = [];
        errorList['name'] = err.name;
        errorList['state'] = err.state;
        errorList['first_address'] = err.first_address;
        errorList['phone'] = err.phone;
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
        <ModalComponent mainTitle="Create" subTitle="Location" visible={true} footer={footer} onCancel={() => props.onCreated(false)}>
            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="name" rules={rules.name} label="Location Name :" className="da-mb-16"
                    {...getErrorProps(errors['name'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="first_address" rules={rules.first_address} label="Address :" className="da-mb-16"
                    {...getErrorProps(errors['first_address'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="second_address" rules={rules.second_address} label="Address :" className="da-mb-16"
                    {...getErrorProps(errors['second_address'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="state" rules={rules.state} label="State :" className="da-mb-16"
                    {...getErrorProps(errors['state'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="zipcode" rules={rules.zipcode} label="Zip code :" className="da-mb-16"
                    {...getErrorProps(errors['zipcode'])}>
                    <Input />
                </Form.Item>
                <Form.Item name="country_id" rules={rules.country} label="Country :" className="da-mb-16"
                    {...getErrorProps(errors['country'])}>
                    <Select
                        showSearch
                        placeholder="Select a country"
                        options={deps.countries}
                    />
                </Form.Item>
                <Form.Item name="city" rules={rules.city} label="City :" className="da-mb-16"
                    {...getErrorProps(errors['city'])}>
                    <Input />
                </Form.Item>
            </Form>
        </ModalComponent>
    );
}

export default CreateLocation

const rules = {
    name: [
        { required: true, message: 'Please input your first name!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ],
    state: [
        { required: true, message: 'Please input your last name!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ],
    first_address: [
        { required: true, message: 'Please input your address!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ],
    zipcode: [
        { required: true, message: 'Please input your zipcode number!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ],
};
