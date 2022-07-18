import { Row, Col } from "antd";
import React from "react";
import { CChart } from '@coreui/react-chartjs'

const Dashboard = () => {
  const data = [
    {
      label: 'Series 1',
      data: [[0, 1], [1, 5], [2, 4], [3, 2], [4, 7]]
    },
    {
      label: 'Series 2',
      data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    }
  ]
  const axes = [
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ]

  return (
    <CChart
      type="line"
      data={{
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
      }}
    />

  )
}
export default Dashboard;