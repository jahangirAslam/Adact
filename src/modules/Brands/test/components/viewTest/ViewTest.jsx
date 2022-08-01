import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../request";
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

const ViewTest = () => {
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
        makeRequest(setLoader, getItem, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Test Details",
            content: <ViewDetails data={data.object} dependencies={data.dependencies} disable={true} />
        },

    ]

    const onError = (error, msg) => {
        notify(msg.message)
    }


    if (data.length === 0) {
        return "";
    }
    return <TabComponent headers={pageConfig.headers} tabs={tabs} loader={loader}></TabComponent>;
}

export default ViewTest;
