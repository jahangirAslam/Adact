import React from "react";

import { Row, Col } from "antd";
import Countdown from "react-countdown";

import img from "../../../../assets/images/pages/error/coming-soon.svg";

export default function ComingSoon() {
  const Completionist = () => <span>You are good to go!</span>;
  const timerClass = "da-d-block da-text-color-primary-1";
  const timerTextClass = "da-d-block da-text-color-black-80 h4";

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <Row align="middle" justify="center">
          <div className="da-comingsoon-timer-item">
            <span className={timerClass}>{days}</span>
            <span className={timerTextClass}>DAYS</span>
          </div>
          
          <div className="da-comingsoon-timer-item">
            <span className={timerClass}>{hours}</span>
            <span className={timerTextClass}>HOURS</span>
          </div>
          
          <div className="da-comingsoon-timer-item">
            <span className={timerClass}>{minutes}</span>
            <span className={timerTextClass}>MINUTES</span>
          </div>
          
          <div className="da-comingsoon-timer-item">
            <span className={timerClass}>{seconds}</span>
            <span className={timerTextClass}>SECONDS</span>
          </div>
        </Row>
      );
    }
  };

  return (
    <Row className="da-bg-color-primary-4 da-text-center">
      <Col className="da-error-content da-py-32" span={24}>
        <Row className="da-h-100" align="middle" justify="center">
          <Col>
            <img className="da-d-block da-m-auto" src={img} alt="403" />

            <h1 className="da-mb-0">We are launching soon</h1>

            <Countdown date="2022-02-01" renderer={renderer} />
          </Col>
        </Row>
      </Col>

      <Col span={24} className="da-py-24">
        <p className="da-mb-0 da-badge-text">
          COPYRIGHT ©2020 Hypeople, All rights Reserved
        </p>
      </Col>
    </Row>
  );
}
