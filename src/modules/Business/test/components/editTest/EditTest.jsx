import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../request";
import IndexSubmission from "../submission/IndexSubmission";
import ContactDetails from "./ContactDetails";
import Details from './Details';
import LocationIndex from "@mods/commons/locations/IndexLocation";
import ContactIndex from "@mods/commons/contacts/IndexContact";
import AcountSetting from "../../../../commons/Account Setting/AcountSetting";
import ActivityLog from "../../../../componentManagement/chemicalCompounds/components/edits/ActivityLog";




const pageConfig = {
    headers: {
        title: "Adact Medical",
        breadcrumb: [
          
            {
                name: "Your Business",
                path: "/settings/business"

            },
            {
                name: "Adact Medical",
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
            title: "Summary ",
            content: <Details data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Contact Details  ",
            content: <ContactDetails data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Locations ",
            content: <LocationIndex data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Contacts ",
            content: <ContactIndex data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Acount Setting  ",
            content: <AcountSetting data={data.object} dependencies={data.dependencies} />
        },
        {
            title: "Submission ",
             content: <IndexSubmission />
        },
        {
            title: "Activity logs ",
            content: <ActivityLog data={data.object} dependencies={data.dependencies} />
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

export default EditTest;
