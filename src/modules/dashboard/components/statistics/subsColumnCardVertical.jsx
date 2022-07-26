import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import Chart from "react-apexcharts";

export default function SubsColumnCardVertical(props) {
  let Products = props.dataSource.total_product ? props.dataSource.total_product : 0;

  const [chartWidth, setChartWidth] = useState("50%")

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartWidth("100%")
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const [data] = useState({
    series: [
      {
        name: "Earning",
        data: [50, 70, 100, 60],
      },
    ],
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          top: -12,
          bottom: -12,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          startingShape: "rounded",
          colors: {
            backgroundBarColors: [],
            backgroundBarRadius: 5,
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00F7BF"],
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        max: 100,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    },
  });

  return (
    <div className="hp-border-1 hp-overflow-hidden hp-border-color-black-40 hp-border-color-dark-80 hp-border-radius hp-bg-color-black-0 hp-bg-color-dark-100 hp-p-16 hp-card-2">
      <Row gutter={16} align="middle">
        <Col span={24} className="hp-text-center">
          <div
            id="chart"
            className="hp-bg-color-primary-4 hp-bg-color-dark-90 hp-border-radius hp-d-flex-center hp-px-18 hp-mb-18 charts "
          >
            <Row align="center">

              <svg
                className="da-p-12"
                width="80"
                height="90"
                viewBox="0 0 22 22"
                fill="#0093CD"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 14H3V16H8V14Z" fill="#0093CD" />
                <path d="M12 17H3V19H12V17Z" fill="#0093CD" />
                <path d="M18.3333 2H1.66667C1.22481 2.00055 0.801206 2.17632 0.488764 2.48876C0.176323 2.80121 0.00055129 3.22481 0 3.66667V20.3333C0.00055129 20.7752 0.176323 21.1988 0.488764 21.5112C0.801206 21.8237 1.22481 21.9994 1.66667 22H18.3333C18.7752 21.9994 19.1988 21.8237 19.5112 21.5112C19.8237 21.1988 19.9994 20.7752 20 20.3333V3.66667C19.9994 3.22481 19.8237 2.80121 19.5112 2.48876C19.1988 2.17632 18.7752 2.00055 18.3333 2ZM11.6667 3.66667V7H8.33333V3.66667H11.6667ZM1.66667 20.3333V3.66667H6.66667V8.66667H13.3333V3.66667H18.3333L18.3343 20.3333H1.66667Z" fill="#0093CD" />

              </svg>
            </Row>
          </div>

          <h3 className="hp-mb-0 order-Column">{Products}</h3>
          <p className="hp-p1-body hp-mb-0 hp-text-color-black-80 hp-text-color-dark-50 order-Colums">
            All Products
          </p>
        </Col>
      </Row>
    </div>
  );
}
