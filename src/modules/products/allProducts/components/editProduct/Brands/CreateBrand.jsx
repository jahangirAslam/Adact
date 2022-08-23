import React, { useEffect, useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { useHistory } from "react-router-dom";
import { CancelButton, SaveButton, HeaderComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { createBrand, getBrandDependencies } from "./requests";
import ManageCountryBrand from "./ManageCountryBrand"

const pageConfig = {
    headers: {
        title: "Create Brand",
        breadcrumb: [
            {
                name: "Brands",
                path: "/common/brands"
            },
            {
                name: "Create",
            }
        ]
    }

}

const formName = "createBrand";

const CreateBrand = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const [selectCountry, setSelectCountry] = useState([]);
    const [deps, setDeps] = useState({
        countries: []
    });
    const onFinish = (data) => {
        let payload = { "object": data, "countries": selectCountry }
        makeRequest(setLoader, createBrand, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Contact Created", res.msg);
        history.push(`/common/brands`);
    }

    const getSelectFieldsData = () => {
        makeRequestStateless(getBrandDependencies, null, onDependencySuccess, null);
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

    const onClose = () => {
        history.push(`/common/brands`);
    }

    const countryData = (res, des) => {
        if (des === "2") {
            if (selectCountry.length < 1) {
                var data = [];
                data.push(res.id);
                setSelectCountry(data);
            } else {
                setSelectCountry([...selectCountry, res.id]);
            }
        } else {
            var index = selectCountry.indexOf(res.id)
            if (index !== -1) {
                selectCountry.splice(index, 1);
                setSelectCountry(selectCountry);
            }
        }
    }

    const onError = (err) => {
        let errorList = [];
        errorList['name'] = err.name;
        errorList['sub_name'] = err.sub_name;
        errorList['market'] = err.market;
        setErrors(errorList);
    }

    const columnsFromBackend = {
        1: {
            title: 'Available Countries',
            items: deps.countries,
        },
        2: {
            title: 'Selected Countries',
            items: [],
        },
    };

    // ------------------------------------
    // Start footer buttons array
    // ------------------------------------

    // ------------------------------------
    // Eend footer buttons array
    // ------------------------------------

    if (deps.countries.length === 0) {
        return <Skeleton />;
    }

    return (
        <> <HeaderComponent headers={ pageConfig.headers } />
            <div className="da-p-64">
                <Form
                    layout="vertical"
                    name={ formName }
                    onFinish={ onFinish }
                >
                    <Form.Item name="name" rules={ rules.name } label="Name :" className="da-mb-16"
                        { ...getErrorProps(errors['name']) }>
                        <Input />
                    </Form.Item>
                    <Form.Item name="sub_name" rules={ rules.sub_name } label="Sub-Name :" className="da-mb-16"
                        { ...getErrorProps(errors['sub_name']) }>
                        <Input />
                    </Form.Item>
                    <Form.Item name="market" rules={ rules.market } label="Market :" className="da-mb-16"
                        { ...getErrorProps(errors['market']) }>
                        <Input />
                    </Form.Item>
                </Form>
                <div className="da-mb-32">
                    <ManageCountryBrand columnsFromBackend={ columnsFromBackend } data={ countryData } />
                </div>
                <SaveButton form={ formName } key="create_button" htmlType="submit" state={ loader } />,
                <CancelButton key="close_button" onClick={ onClose } />
            </div>
        </>
    );
}

export default CreateBrand

const rules = {
    name: [
        { required: true, message: 'Please input your first name!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ],
    market: [
        { required: true, message: 'Please input your market!', },
        { min: 3, message: 'Minimum name length is 3', },
        { max: 100, message: 'Maximum name length is 100', },
    ]
};
