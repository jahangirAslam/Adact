import React from "react";
import { Row, Col } from 'antd';
import { ArrowRightOutlined } from "@ant-design/icons";
import { formatCompleteDataTime } from "@utils/helpers";

export const ActivityLog = (props) => {
  const { logs } = props;

  const conToStr = (each) => {
    if (each.event === 'created') {
      return '';
    }

    let strs = [];
    if (each.event === 'updated') {
      for (const i in each.properties.attributes) {
        let str = <div>{`${each.properties.old[i]}`} <ArrowRightOutlined /> {`${each.properties.attributes[i]}`}</div>;
        strs.push(str);
      }
    }

    return <>{strs.map((each) => (each))}</>;
  };

  return (
    <>
      {logs.length > 0 ?
        <>
          {logs.map((res, index) =>
            <div className="da-border-1 da-border-radius da-p-12 da-mb-4 da-d-flex" key={index}>
              <div className="ant-avatar ant-avatar-lg ant-avatar-square da-mr-10"></div>
              <div>
                <strong>{res.name}</strong>
                <span className="da-text-color-black-60"> {res.event} on</span>
                <span className="da-text-color-black-80"> {formatCompleteDataTime(res.created_at)}</span>
                <div className="da-text-color-black-60">{conToStr(res)}</div>
              </div>
            </div>
          )}
        </>
        : <Row><Col span={24} className="da-text-center">No logs</Col></Row>
      }
    </>
  );

};

export default ActivityLog;
