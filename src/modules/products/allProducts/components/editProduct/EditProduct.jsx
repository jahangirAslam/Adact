import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import Details from './Details'
import { getProduct } from "../request";
import Recipe from "./recipe/Recipe";
import LabTest from "./labTest/LabTest";

const pageConfig = {
    headers: {
        title: "Edit Product",
        breadcrumb: [
            {
                name: "Product",
                path: "/products"
            },
            {
                name: "Edit",
            }
        ]
    }

}

const EditProduct = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(true);

    const [data, setData] = useState({
        object: null,
        dependencies: []
    });



    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const getData = () => {
        makeRequest(setLoader, getProduct, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Product Identification",
            content: <Details data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Recipe",
            content: <Recipe product_id={id} />
        },
        {
            title: "Laboratory Test",
            content: <LabTest data={data.object} dependencies={data.dependencies} />
        },

    ]

    const onError = (res) => {
        // handle call failed error
    }

    if (data.length === 0) {
        return "";
    }
    return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;

}

export default EditProduct;
