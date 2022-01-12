import React from "react";
import { Row, Col } from 'antd';

export const ActivityLog = (props) => {
  const { logs } = props;

  return (
    <>
      {logs.length > 0 ?
        <>
          {logs.map((res, index) =>
            <div className="da-border-1 da-p-12" key={index}>
              <Row>
                <Col span={12}>
                  <strong>{res.name}</strong>
                </Col>
              </Row>
            </div>
          )}
        </>
        : <Row><Col span={24} className="da-text-center"><strong>no logs</strong></Col></Row>
      }
    </>
  );

};

export default ActivityLog;
