import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../request";
import IndexSubmission from "../submission/IndexSubmission";
import AnnualData from "./AnnualData";
import BrandWithDrawl from "./BrandWithDrawl";
import Details from './Details';

const pageConfig = {
    headers: {
        title: "Adact Brands ",
        breadcrumb: [
          
            {
                name: "Your Brands",
                path: "/product/brands"

            },
            {
                name: "Edit",
            }
        ]
    }

}

const EditTest = () => {
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
            title: "Details ",
            content: <Details data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Brands Withdrawal  ",
            content: <BrandWithDrawl data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Annual Data ",
            content: <AnnualData data={data.object} dependencies={data.dependencies} />
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

export default EditTest;
