import { CChart } from '@coreui/react-chartjs';
import { makeRequest } from "@utils/helpers";
import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { getDashbordData } from './requests';

const Dashboard = () => {
  // let lablesData = []
  const [disabled, setDisabled] = useState(true);
  const [lablesData, setLablesData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loader, setLoader] = useState(false);

  const toggle = () => {
    setDisabled(!disabled);
  };
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    let payload = {}
    makeRequest(setLoader, getDashbordData, payload, onSuccess, null);

  }
  const onSuccess = (response) => {
    let lables = []
    let data = []
    response.forEach(element => {
      data.push(element.value);
      lables.push(element.month)
      
    });
    setLablesData(lables)
    setDataSource(data)
  }


  return (
    <div>
      <div className="dashboardBtn">
        <Switch className="dashboardswitch" checkedChildren="Monthly" unCheckedChildren="Yearly" />
      </div>
    
        <CChart
          className="dashboardChart"
          type="line"
          data={{
            labels: lablesData,
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: dataSource
              },

            ],
          }}

        />
     
    </div>
  )
}
export default Dashboard;