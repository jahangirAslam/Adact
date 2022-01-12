import React, { useState } from "react";
import { Form, Input, Skeleton, Select } from "antd";
import { CancelButton, ModalComponent } from "@comps/components";
import { makeRequest, notify, makeRequestStateless } from "@utils/helpers";
import { getLocation, getLocationDependencies } from "../requests";
import { useEffect } from "react";


const ViewLocation = (props) => {
    const [data, setData] = useState([]);
    const [deps, setDeps] = useState({
        countries: []
    });

    useEffect(() => {
        getSelectFieldsData();
        makeRequest(Function, getLocation, props.id, onLocationSuccess, onLocationError);
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

    // ------------------------------------
    // Start footer buttons array
    // ------------------------------------
    const footer = [
        <CancelButton key="close_button" onClick={ () => props.onUpdated(false) } />
    ];
    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    if (data.length === 0) {
        return <Skeleton />
    }

    return (
        <ModalComponent mainTitle="View" subTitle="Location" visible={ true } footer={ footer } onCancel={ () => props.onUpdated(false) }>
            <Form
                layout="vertical"
                initialValues={ data.object }
            >
                <Form.Item name="name" label="Location Name :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="first_address" label="Address :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="second_address" label="Address :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="state" label="State :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="zipcode" label="Zip code :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="country_id" label="Country :" className="da-mb-16">
                    <Select disabled
                        showSearch
                        placeholder="Select a country"
                        options={ deps.countries }
                    />
                </Form.Item>
                <Form.Item name="city" label="City :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>

            </Form>
        </ModalComponent>
    );
}

export default ViewLocation
