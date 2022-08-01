import { TabComponent } from "@comps/components";
import { makeRequest,notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubstance } from "../../requests";
import ViewDetails from "./ViewDetails";




const pageConfig = {
    headers: {
        title: "View Substances",
        breadcrumb: [
            {
                name: "Substances",
                path: "/component-management/substances"
            },
            {
                name: "Substance",
            }
        ]
    }

}

const ViewSubstances = () => {
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
        makeRequest(setLoader, getSubstance, id, onSuccess, onError);
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

export default ViewSubstances;
