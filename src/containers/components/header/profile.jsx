import { CancelButton, ModalComponent, SaveButton } from "@comps/components";
import { getErrorProps, makeRequest, notify, makeRequestStateless } from "@utils/helpers";
import { Form, Input, Avatar, Row } from "antd";
import React, { useEffect, useState } from "react";
import Man from "@assets/images/menu/man.svg";
import {  useSelector } from "react-redux";

// import { createFlavour, getProductDependencies } from "./request";
const AvatarIcon = () => {
    return <img src={Man} alt="Avatar" />;
  };


const formName = "createFlavour";

const Profile = (props) => {
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.auth.authUser);
    const [deps, setDeps] = useState({
        manufacturers: [],


    });


    const onFinish = (data) => {


        let payload = { "object": data }
        payload.object["type"] = "product";
        // makeRequest(setLoader, createFlavour, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Product Created", res.msg);
        props.onCreated(res);
    }

    const getSelectFieldsData = () => {
        // makeRequestStateless(getProductDependencies, null, onDependencySuccess, null);
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
        <> 
        <Row justify="center"  >

        <Avatar src={user.profile_url} icon={<AvatarIcon />} size={120} />
        </Row>

            <Form
                layout="vertical"
                name={formName}
                onFinish={onFinish}
            >
                <Form.Item name="name" label="UserName :" className="da-mb-16"
                    {...getErrorProps(errors['name'])}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="emal" label="Email :" className="da-mb-16"
                    {...getErrorProps(errors['Email'])}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="Password" label="Password :" className="da-mb-16"
                    {...getErrorProps(errors['name'])}
                >
                    <Input />
                </Form.Item>
               


            </Form>
        </>
    );
}

export default Profile


