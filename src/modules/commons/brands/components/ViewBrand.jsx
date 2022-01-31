import React, { useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { CancelButton, ModalComponent } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { getBrand } from "../requests";
import { useEffect } from "react";


const ViewBrand = (props) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        makeRequest(Function, getBrand, props.id, onBrandSuccess, onBrandError);
        // eslint-disable-next-line
    }, []);

    const onBrandSuccess = (res) => {
        setData(res);
    }

    const onBrandError = (res) => {
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
        <ModalComponent mainTitle="View" subTitle="Brand" visible={ true } footer={ footer } onCancel={ () => props.onUpdated(false) }>
            <Form
                layout="vertical"
                initialValues={ data.object }
            >
                <Form.Item name="name" label="Name :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="sub_name" label="Sub-Name :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="market" label="Market :" className="da-mb-16">
                    <Input disabled />
                </Form.Item>

            </Form>
        </ModalComponent>
    );
}

export default ViewBrand
