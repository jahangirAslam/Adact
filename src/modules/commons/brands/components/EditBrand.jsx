import React, { useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { CancelButton, SaveButton, HeaderComponent } from "@comps/components";
import { makeRequest, getErrorProps, notify, makeRequestStateless } from "@utils/helpers";
import { getBrand, updateBrand, getBrandDependencies } from "../requests";
import { useEffect } from "react";
import ManageCountryBrand from "./ManageCountryBrand"

const pageConfig = {
    headers: {
        title: "Edit Brand",
        breadcrumb: [
            {
                name: "Brands",
                path: "/common/brands"
            },
            {
                name: "Edit",
            }
        ]
    }

}

const formName = "editBrand";

const EditBrand = (props) => {

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const [selectCountry, setSelectCountry] = useState([]);
    const [deps, setDeps] = useState([]);

    useEffect(() => {
        getSelectFieldsData();
        makeRequest(setLoader, getBrand, id, onBrandSuccess, onBrandError);
        // eslint-disable-next-line
    }, []);

    const getSelectFieldsData = () => {
        makeRequestStateless(getBrandDependencies, null, onDependencySuccess, null);
    }

    const onDependencySuccess = (data, res) => {
        setDeps(data.countries);
    }

    const onBrandSuccess = (res) => {
        setData(res);
        var defaultData = [];
        res.selectedCountries.forEach((data => {
            defaultData.push(data.id)
        }));
        setSelectCountry(defaultData);
    }

    const onBrandError = (res) => {
        notify(res.msg)
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

    const onFinish = (data) => {
        let payload = {
            "name": data.name, "sub_name": data.sub_name, "market": data.market, "id": id, selectedCountries: selectCountry
        }
        makeRequest(setLoader, updateBrand, payload, onSuccess, onError);
    }

    const onSuccess = (data, res) => {
        notify("Brand Updated", res.msg);
        history.push(`/common/brands`);
    }

    const onClose = () => {
        history.push(`/common/brands`);
    }

    const columnsFromBackend = {
        1: {
            title: 'Available Countries',
            items: deps,
        },
        2: {
            title: 'Selected Countries',
            items: data.selectedCountries,
        },
    };

    const onError = (err) => {
        let errorList = [];
        errorList['name'] = err.name;
        errorList['state'] = err.state;
        errorList['first_address'] = err.first_address;
        errorList['phone'] = err.phone;
        setErrors(errorList);
    }

    if (data.length === 0 || deps.length === 0) {
        return <Skeleton />
    }

    return (
        <> <HeaderComponent headers={ pageConfig.headers } />
            <div className="da-p-64">
                <Form
                    layout="vertical"
                    name={ formName }
                    onFinish={ onFinish }
                    initialValues={ data.object }
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

export default EditBrand

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

