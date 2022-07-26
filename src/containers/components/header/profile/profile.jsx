import { TabComponent } from "@comps/components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryIcon from "../../menu/icons/SummaryIcon";
import MyProfile from "./MyProfile";
import Security from "./Security";



const pageConfig = {
    headers: {
        title: "Edit Profile",
        breadcrumb: [
            {
                name: "Profile",
                path: "/component-management/flavours"
            },
           
        ]
    }

}

const Profile = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState(false);

    const [data, setData] = useState({
        object: null,
        dependencies: []
    });



    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const getData = () => {
        // makeRequest(setLoader, getFlavour, id, onSuccess, onError);
    }

    const onSuccess = (res) => {
        setData(res);
    }


    const tabs = [
        {
            title: "My Profile",
            icon: <SummaryIcon />,

            content: <MyProfile  />
        },
        {
          title: "Security",
          icon: <SummaryIcon />,

          content: <Security  />
      },
      {
        title: "Settings",
        icon: <SummaryIcon />,

        content: <Security  />
    },
    {
      title: "Cloud",
      icon: <SummaryIcon />,

      content: <Security  />
  },
  {
    title: "My devices",
    icon: <SummaryIcon />,

    content: <Security  />
},
{
  title: "Activity log",
  icon: <SummaryIcon />,

  content: <Security  />
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

export default Profile;
