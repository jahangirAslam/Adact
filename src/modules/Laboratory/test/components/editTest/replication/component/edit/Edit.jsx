import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LaboratoryIcon from "../../../../../../../../containers/components/menu/icons/LaboratoryIcon";
import { getAllItems } from "../request";
import Details from "../../../Details";
const pageConfig = {
    headers: {
        title: "Laboratory Test",
        breadcrumb: [
            {
                name: "Laboratory Test",
                path: "/products"
            },
            {
                name: "Edit",
            }
        ]
    }

}

const Edit = () => {
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
        makeRequest(setLoader, getAllItems, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Test Details",
            icon: <LaboratoryIcon />,
            content: <Details data={data.object} dependencies={data.dependencies} />
        },


    ]

    const onError = (res) => {
        // handle call failed error
    }

    if (data.length === 0) {
        return "";
    }
    return  <>hello</>

}

export default Edit;
