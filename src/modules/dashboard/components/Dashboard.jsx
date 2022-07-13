import { Row,Col } from "antd";
import React from "react";
import { Chart } from 'react-charts'

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
    <Row>
      <Row
        className="chart"
      >
        <Col span={24}>
        <h4>Products & Presentations</h4>
        </Col>
        <Col span={24}>
        <Chart data={data} axes={axes} />
        </Col>
      </Row>
      <Row
        className="chart da-pt-48"
      >
        <Col span={24}>
        <h4>Products & Presentations</h4>
        </Col>
        <Chart data={data} axes={axes} />
      </Row>
    </Row>

  )
}
export default Dashboard;