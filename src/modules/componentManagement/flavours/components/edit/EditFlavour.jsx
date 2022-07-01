import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentsIcon from "../../../../../containers/components/menu/icons/DocumentsIcon";
import SummaryIcon from "../../../../../containers/components/menu/icons/SummaryIcon";
import { getFlavour } from "../request";
import FlavourInformation from "./FlavourInformation";
import ProductUseFlavour from "./ProductUseFlavour";
import Recipe from "./recipe/Recipe";


const pageConfig = {
    headers: {
        title: "Edit Flavour",
        breadcrumb: [
            {
                name: "Flavours",
                path: "/component-management/flavours"
            },
            {
                name: "Information",
            }
        ]
    }

}

const EditFlavour = () => {
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
        makeRequest(setLoader, getFlavour, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "Summary",
            icon: <SummaryIcon />,

            content: <FlavourInformation data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Recipe",
            icon: <DocumentsIcon />,
            content: <Recipe flavourId={id} />
        },
        {
            title: "List of Product which uses this flavour",
            icon: <DocumentsIcon />,
            content: <ProductUseFlavour flavourId={id} />
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

export default EditFlavour;
