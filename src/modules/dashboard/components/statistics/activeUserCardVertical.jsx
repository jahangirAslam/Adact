import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import Chart from "react-apexcharts";

export default function ActiveUserCardVertical(props) {
  let user = props.dataSource.total_user ? props.dataSource.total_user : 0;
  const [chartWidth, setChartWidth] = useState("50%")

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartWidth("100%")
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const [data] = useState({
    series: [40],
    options: {
      chart: {
        fontFamily: "Manrope, sans-serif",
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
          top: 0,
          bottom: 0,
        },
      },
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          size: 85,
          hollow: {
            size: "60%",
          },
          track: {
            show: true,
            background: "#ffffff",
            strokeWidth: "97%",
            opacity: 1,
            margin: 5,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },

          dataLabels: {
            show: true,
            value: {
              fontSize: "14px",
              offsetY: -10,
              color: "#636E72",
            },
            total: {
              show: true,
              fontSize: "14px",
              fontWeight: "light",
              label: "",
              formatter: function (w) {
                return "%" + 40;
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FFC700"],
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
                fill="rgba(0, 16, 247, 0.85)  "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.9278 12.4944C14.8778 12.4944 16.3944 10.9056 16.3944 8.95556C16.3944 7.00556 14.8056 5.48889 12.8556 5.48889C10.9056 5.48889 9.38889 7.07778 9.38889 8.95556C9.38889 10.9056 10.9778 12.4944 12.9278 12.4944ZM12.8556 6.93334C12.9278 6.93334 12.9278 6.93334 12.8556 6.93334C14.0111 6.93334 14.95 7.87223 14.95 9.02778C14.95 10.1833 14.0111 11.05 12.8556 11.05C11.7 11.05 10.8333 10.1111 10.8333 9.02778C10.8333 7.87223 11.7722 6.93334 12.8556 6.93334Z" fill="#0093CD" />
                <path d="M23.6167 12.0611C22.2444 10.8333 20.4389 10.1833 18.5611 10.2556H17.9833C17.8389 10.8333 17.6222 11.3389 17.3333 11.7722C17.7667 11.7 18.1278 11.7 18.5611 11.7C19.9333 11.6278 21.3056 12.0611 22.3889 12.8556V18.0556H23.8333V12.2778L23.6167 12.0611Z" fill="#0093CD" />
                <path d="M16.9 5.63331C17.2611 4.76664 18.2722 4.33331 19.2111 4.69442C20.0778 5.05553 20.5111 6.06664 20.15 7.00553C19.8611 7.65553 19.2111 8.08886 18.5611 8.08886C18.4167 8.08886 18.2 8.08886 18.0556 8.01664C18.1278 8.37775 18.1278 8.73886 18.1278 9.02775V9.46109C18.2722 9.46109 18.4167 9.53331 18.5611 9.53331C20.3667 9.53331 21.8111 8.08886 21.8111 6.35553C21.8111 4.54997 20.3667 3.10553 18.6333 3.10553C17.4778 3.10553 16.4667 3.68331 15.8889 4.69442C16.25 4.91109 16.6111 5.19997 16.9 5.63331Z" fill="#0093CD" />
                <path d="M8.66667 11.8444C8.37778 11.4111 8.16112 10.9055 8.01667 10.3278H7.43889C5.56112 10.2555 3.75556 10.9055 2.38334 12.0611L2.16667 12.2778V18.0555H3.61112V12.8555C4.76667 12.0611 6.06667 11.6278 7.43889 11.7C7.87223 11.7 8.30556 11.7722 8.66667 11.8444Z" fill="#0093CD" />
                <path d="M7.43889 9.46114C7.58334 9.46114 7.72778 9.46114 7.87223 9.38892V8.95558C7.87223 8.59447 7.87223 8.23336 7.94445 7.94447C7.8 8.01669 7.58334 8.01669 7.43889 8.01669C6.5 8.01669 5.70556 7.22225 5.70556 6.28336C5.70556 5.34447 6.5 4.55003 7.43889 4.55003C8.16112 4.55003 8.81112 4.98336 9.1 5.63336C9.38889 5.27225 9.82223 4.91114 10.1833 4.62225C9.24445 3.10558 7.29445 2.60003 5.77778 3.53892C4.26112 4.4778 3.75556 6.4278 4.69445 7.94447C5.27223 8.88336 6.28334 9.46114 7.43889 9.46114Z" fill="#0093CD" />
                <path d="M18.85 16.3944L18.7056 16.1778C17.2611 14.5889 15.2389 13.65 13.0722 13.7222C10.9056 13.65 8.81112 14.5889 7.36667 16.1778L7.22223 16.3944V21.8833C7.22223 22.5333 7.72778 23.1111 8.45001 23.1111H17.6945C18.3445 23.1111 18.9222 22.5333 18.9222 21.8833V16.3944H18.85ZM17.4056 21.6667H8.66667V16.9C9.82223 15.7444 11.4111 15.1667 13.0722 15.1667C14.6611 15.0944 16.25 15.7444 17.4056 16.9V21.6667Z" fill="#0093CD" />


              </svg>
            </Row>
          </div>

          <h3 className="hp-mb-0 order-Column">{user}</h3>
          <p className="hp-p1-body hp-mb-0 hp-text-color-black-80 hp-text-color-dark-50 order-Colums">
            Active Users
          </p>
        </Col>
      </Row>
    </div>
  );
}
