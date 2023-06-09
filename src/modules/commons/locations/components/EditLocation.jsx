import React, { useState } from "react";
import { Form, Input, Skeleton, Select } from "antd";
import { CancelButton, SaveButton, ModalComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { getLocation, updateLocation, getLocationDependencies } from "../requests";
import { useEffect } from "react";


const formName = "editLocation";

const EditLocation = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState([]);
    const [deps, setDeps] = useState({
        countries: []
    });

    useEffect(() => {
        getSelectFieldsData();
        makeRequest(setLoader, getLocation, props.id, onLocationSuccess, onLocationError);
        // eslint-disable-next-line
    }, []);

    const getSelectFieldsData = () => {
        makeRequestStateless(getLocationDependencies, null, onDependencySuccess, null);
    }

    const onDependencySuccess = (data, res) => {
        setDeps({
            countries: data.countries,
        });
    }

    const onLocationSuccess = (res) => {
        setData(res);
    }

    const onLocationError = (res) => {
        notify(res.msg)
    }

    const onFinish = (data) => {
        let payload = {
            "name": data.name, "state": data.state, "first_address": data.first_address, "second_address": data.second_address
            , "zipcode": data.zipcode, "id": props.id, "country_id": data.country_id, "city": data.city,
        }
        makeRequest(setLoader, updateLocation, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Location Updated", res.msg);
        props.onUpdated(data.object);
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
        <SaveButton form={ formName } key="update_button" htmlType="submit" state={ loader } />,
        <CancelButton key="close_button" onClick={ () => props.onUpdated(false) } />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    if (data.length === 0) {
        return <Skeleton />
    }

    return (
        <ModalComponent mainTitle="Update" subTitle="Location" visible={ true } footer={ footer } onCancel={ () => props.onUpdated(false) }>
            <Form
                layout="vertical"
                name={ formName }
                onFinish={ onFinish }
                initialValues={ data.object }
            >
                <Form.Item name="name" rules={ rules.name } label="Location Name :" className="da-mb-16"
                    { ...getErrorProps(errors['name']) }>
                    <Input />
                </Form.Item>
                <Form.Item name="first_address" rules={ rules.first_address } label="Address :" className="da-mb-16"
                    { ...getErrorProps(errors['first_address']) }>
                    <Input />
                </Form.Item>
                <Form.Item name="second_address" rules={ rules.second_address } label="Address :" className="da-mb-16"
                    { ...getErrorProps(errors['second_address']) }>
                    <Input />
                </Form.Item>
                <Form.Item name="state" rules={ rules.state } label="State :" className="da-mb-16"
                    { ...getErrorProps(errors['state']) }>
                    <Input />
                </Form.Item>
                <Form.Item name="zipcode" rules={ rules.zipcode } label="Zip code :" className="da-mb-16"
                    { ...getErrorProps(errors['zipcode']) }>
                    <Input />
                </Form.Item>
                <Form.Item name="country_id" rules={ rules.country } label="Country :" className="da-mb-16"
                    { ...getErrorProps(errors['country']) }>
                    <Select
                        showSearch
                        placeholder="Select a country"
                        options={ deps.countries }
                    />
                </Form.Item>
                <Form.Item name="city" rules={ rules.city } label="City :" className="da-mb-16"
                    { ...getErrorProps(errors['city']) }>
                    <Input />
                </Form.Item>
            </Form>
        </ModalComponent>
    );
}

export default EditLocation

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
