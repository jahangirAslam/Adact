import React, { useState } from "react";

import { Card, Row, Col, DatePicker } from "antd";
import Chart from "react-apexcharts";
import moment from "moment";
import { useEffect } from "react";
import { getDateMeta } from "@fullcalendar/react";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { getProductData } from "../requests";

export default function AnalyticsVisitersLineCard() {
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    getDate();
  }, [])

  const onChanges = (date, dateString) => {
    console.log(date, dateString);
    getDate(dateString);
  };
  const getDate = (load) => {
    let payload = load ? load : moment().year().toString();
    makeRequest(setLoader, getProductData, payload, onSuccess, null)
  }
  const onSuccess = (response) => {
    let value = []
    let month = []
    response.forEach(element => {
      value.push(element.value)
      month.push(element.month)
      
    });
    setMonths(month);
    setValues(value);
  }
  const [data] = useState({
      series: [
        {
          name: "Products",
          data: values,
        },
        {
          name: "Organic",
          data: [12245, 7952, 10623, 7935, 14345, 4002],
        },
      ],
    options: {
      chart: {
        fontFamily: "Manrope, sans-serif",
        type: "area",
        id: "visiters-line-card",

        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#0063F7", "#00F7BF"],
      labels: {
        style: {
          fontSize: "14px",
        },
      },
      fill: {
        opacity: 0.3,
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: "#DFE6E9",
        row: {
          opacity: 0.5,
        },
      },

      markers: {
        strokeWidth: 0,
        size: 0,
        colors: ["rgba(0, 255, 198, 0.17)", "rgba(45, 125, 239, 0.17)"],
        hover: {
          sizeOffset: 1,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
          borderType: "solid",
          borderColor: "#DFE6E9",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },

        labels: {
          style: {
            fontSize: "14px",
          },
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      legend: {
        horizontalAlign: "right",
        offsetX: 40,
        position: "top",
        labels: {
          colors: "#636E72"
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
          },
            // formatter: (value) => {
            //   return value / 1000 + "K";
            // },
        },

        min: 0,
        // max: 30000,
        tickAmount: 3,
      },
    },
  });

  return (
    <Card className="hp-border-color-black-40 hp-analytics-visiters-chart hp-overflow-hidden dashboardCard">
      <Row className="hp-w-100 hp-overflow-hidden">
        <Col className="hp-mb-16" span={24}>
          <Row justify="space-between">
            <Row align="bottom">
              <h4 className="hp-mr-8 visiters">Products</h4>
            </Row>

            <Col >
              <DatePicker
                className="datePicker"
                picker="year"
                defaultValue={moment("2022", "YYYY")}
                onChange={onChanges}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <div id="visiters-line-card">
            <Chart
              options={data.options}
              series={[
                {
                  name: "Products",
                  data: values,
                },
                
              
              ]}
              type="area"
              height="100%"
              legend="legend"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
