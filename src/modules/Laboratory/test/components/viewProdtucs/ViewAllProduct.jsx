import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import { getProduct } from "../request";
import ViewDetails from "./ViewDetails";



const pageConfig = {
    headers: {
        title: "View Product",
        breadcrumb: [
            {
                name: "Products",
                path: "/products/product"
            },
            {
                name: "Product",
            }
        ]
    }

}

const ViewAllProduct = () => {
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
            title: "Product Details",
            content: <ViewDetails data={data.object} dependencies={data.dependencies} disable={true} />
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

export default ViewAllProduct;
