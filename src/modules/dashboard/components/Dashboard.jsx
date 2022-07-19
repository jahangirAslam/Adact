import { Row, Col, Button, Switch } from "antd";
import React from "react";
import { CChart } from '@coreui/react-chartjs'
import { useState } from 'react';
const Dashboard = () => {
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        borderColor: "rgba(220, 220, 220, 1)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "#fff",
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
      },
      {
        label: "My Second dataset",
        backgroundColor: "rgba(151, 187, 205, 0.2)",
        borderColor: "rgba(151, 187, 205, 1)",
        pointBackgroundColor: "rgba(151, 187, 205, 1)",
        pointBorderColor: "#fff",
        data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
      },
    ],
  }
  return (
    <div>
      <div className="dashboardBtn">
      <Switch className="dashboardswitch" checkedChildren="Monthly" unCheckedChildren="Yearly" />

      </div>
    <CChart
    className="dashboardChart"
      type="line"
      data={data}
    />
</div>
  )
}
export default Dashboard;