import { TabComponent } from "@comps/components";
import { notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SettingsIcon from "../../menu/icons/SettingsIcon";
import SummaryIcon from "../../menu/icons/SummaryIcon";
import UsersIcon from "../../menu/icons/UsersIcon";
import Cloud from "./Cloud";
import MyDevices from "./MyDevices";
import MyProfile from "./MyProfile";
import Security from "./Security";
import Setting from "./Setting";

const pageConfig = {
  headers: {
    title: "Edit Profile",
    breadcrumb: [
      {
        name: "Profile",
        path: "/component-management/flavours",
      },
    ],
  },
};

const Profile = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({
    object: null,
    dependencies: [],
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = () => {
    // makeRequest(setLoader, getFlavour, id, onSuccess, onError);
  };

  const onSuccess = (res) => {
    setData(res);
  };

  const tabs = [
    {
      title: "My Profile",
      icon: <UsersIcon />,

      content: <MyProfile />,
    },
    {
      title: "Security",
      icon: <SummaryIcon />,

      content: <Security />,
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,

      content: <Setting />,
    },
    {
      title: "Cloud",
      icon: <SummaryIcon />,

      content: <Cloud />,
    },
    {
      title: "My devices",
      icon: <SummaryIcon />,
      content: <MyDevices />,
    },
    {
      title: "Activity log",
      icon: <SummaryIcon />,

      content: <Security />,
    },
  ];

  const onError = (error, msg) => {
    notify(msg.message);
  };

  if (data.length === 0) {
    return "";
  }
  return (
    <TabComponent
      headers={pageConfig.headers}
      tabs={tabs}
      loader={loader}
    ></TabComponent>
  );
};

export default Profile;
