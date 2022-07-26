import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import Chart from "react-apexcharts";
import ThirdPartyIcon from "../../../../containers/components/menu/icons/ThirdPartyIcon";

export default function OrderColumnCardVertical(props) {
  let ThirdPartyCount = props.dataSource.all_third_party ? props.dataSource.all_third_party : 0;
  
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
        name: ["Earning", "avx"],
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
      colors: ["#0010F7"],
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
              <path
                d="M18.9706 18.315C17.4196 18.315 16.1612 17.0896 16.1612 15.576C16.1612 14.0646 17.4196 12.837 18.9706 12.837C20.5216 12.837 21.78 14.0624 21.78 15.576C21.78 17.0874 20.5216 18.315 18.9706 18.315ZM18.9706 11.9306C18.81 11.9306 18.6538 11.9438 18.4998 11.9636C18.4998 11.9504 18.502 11.9372 18.502 11.924C18.502 9.04859 16.8014 6.56479 14.3308 5.36799C14.6036 4.86199 14.7598 4.28559 14.7598 3.67399C14.7598 3.62559 14.7554 3.57939 14.7532 3.53099C18.0642 4.94339 20.3786 8.16859 20.3786 11.9218C20.3786 12.0142 20.3676 12.1044 20.3654 12.1946C19.9342 12.0274 19.4634 11.9306 18.9706 11.9306ZM11.0066 6.41079C9.4512 6.41079 8.1906 5.18099 8.1906 3.66519C8.1906 2.14939 9.4512 0.919586 11.0066 0.919586C12.562 0.919586 13.8226 2.14939 13.8226 3.66519C13.8226 5.18319 12.562 6.41079 11.0066 6.41079ZM3.5046 11.924C3.5046 11.9372 3.5068 11.9504 3.5068 11.9636C3.3528 11.9438 3.1944 11.9306 3.036 11.9306C2.5454 11.9306 2.079 12.0252 1.65 12.1924C1.6478 12.1022 1.6368 12.012 1.6368 11.9218C1.6368 8.16859 3.949 4.94779 7.2556 3.53319C7.2534 3.57939 7.249 3.62559 7.249 3.67179C7.249 4.28339 7.4052 4.85979 7.678 5.36579C5.2052 6.56479 3.5046 9.04859 3.5046 11.924ZM5.8388 15.576C5.8388 17.0896 4.5804 18.315 3.0294 18.315C1.4784 18.315 0.220001 17.0874 0.220001 15.576C0.220001 14.0646 1.4784 12.837 3.0294 12.837C4.5804 12.837 5.8388 14.0624 5.8388 15.576ZM6.1996 17.545C7.502 18.6076 9.1762 19.2478 11.0044 19.2478C12.8326 19.2478 14.5068 18.6076 15.8092 17.545C16.1502 18.0686 16.6188 18.5042 17.1798 18.8034C15.5298 20.2158 13.376 21.0804 11.0088 21.0804C8.6416 21.0804 6.4856 20.2158 4.8356 18.8012C5.3922 18.502 5.8586 18.0664 6.1996 17.545Z"
                
                />

            </svg>
            </Row>
          </div>

          <h3 className="hp-mb-0 order-Column">{ThirdPartyCount}</h3>
          <p className="hp-p1-body hp-mb-0 hp-text-color-black-80 hp-text-color-dark-50 order-Colums">All Third Parties</p>
        </Col>
      </Row>
    </div>
  );
}
