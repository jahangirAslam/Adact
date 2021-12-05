import React from "react";
import { Link } from "react-router-dom";
import { PageHeader, Breadcrumb } from "antd";


const BaseHeader = (props) => {

  const { children, headers } = { ...props };

  const BreadItem = (each, i) => {
    let elem = each.breadcrumbName;
    if (each.path) {
      elem = <Link to={each.path}>{each.breadcrumbName}</Link>;
    }
    return <Breadcrumb.Item key={i}>{elem}</Breadcrumb.Item>
  };

  return (
    <div className="da-px-16 da-pt-16">
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
        {headers.breadcrumb.map((item, index) => (
          BreadItem(item, index)
        ))}
      </Breadcrumb>
      <PageHeader
        className="site-page-header da-p-0"
        title={headers.title}
        extra={children}
      />
    </div>
  );
};

export default BaseHeader;
