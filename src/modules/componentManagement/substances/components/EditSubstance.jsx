import { TabComponent } from "@comps/components";
import { makeRequest } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardIcon from "../../../../containers/components/menu/icons/DashboardIcon";
import { getSubstance } from "./../requests";
import BasicInformation from "./edits/BasicInformation";
import ChemicalPhysicalProperties from "./edits/ChemicalPhysicalProperties";

const pageConfig = {
  headers: {
    title: "Manage Substance",
    breadcrumb: [
      {
        name: "Substances",
        path: "/component-management/substances",
      },
      {
        name: "Manage",
      },
    ],
  },
};

const EditSubstance = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState("");
  useEffect(() => {
    makeRequest(setLoader, getSubstance, id, substanceSuccess, Function);
    // eslint-disable-next-line
  }, []);

  const substanceSuccess = (res) => {
    setData(res.object);
  };

  const tabs = [
    {
      title: "Summary",
      icon: <DashboardIcon />,
      content: <BasicInformation id={id} data={data} />,
    },
    {
      title: "Chemical and Physical Properties",
      icon: <DashboardIcon />,
      content: <ChemicalPhysicalProperties id={id} data={data} />,
    },
  ];

  return (
    <TabComponent
      headers={pageConfig.headers}
      tabs={tabs}
      loader={loader}
    ></TabComponent>
  );
};

export default EditSubstance;
