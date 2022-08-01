import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryIcon from "../../../../../containers/components/menu/icons/SummaryIcon";
import LaboratoryIcon from "../../../../../containers/components/menu/icons/LaboratoryIcon";
import { getProduct } from "../request";
import Details from './Details';
import Replication from "./replication/Replication";

const pageConfig = {
    headers: {
        title: "Laboratory Test",
        breadcrumb: [
            {
                name: "Laboratory Test",
                path: "/laboratory/test"
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
        makeRequest(setLoader, getProduct, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Summary",
            icon: <SummaryIcon/>,
            content: <Details data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Test Replications",
            icon: <LaboratoryIcon />,
            content: <Replication data={data.object} dependencies={data.dependencies} />
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
