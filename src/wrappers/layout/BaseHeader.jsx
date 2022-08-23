import React from "react";
import { Link } from "react-router-dom";
import { PageHeader, Breadcrumb } from "antd";

const BaseHeader = (props) => {
  const { children, headers } = { ...props };

  const BreadItem = (each, i) => {
    let elem = each.name;
    if (each.path) {
      elem = <Link to={each.path}>{each.name}</Link>;
    }
    return <Breadcrumb.Item key={i}>{elem}</Breadcrumb.Item>;
  };

  return (
    <div className="da-px-32 da-pt-6 da-pb-6 page-header">
      <PageHeader
        className="site-page-header da-p-0"
        title={headers?.title}
        extra={children}
        // icon={}
      />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        {headers.breadcrumb.map((item, index) => BreadItem(item, index))}
      </Breadcrumb>
    </div>
  );
};

export default BaseHeader;
