import React from "react";
import { Breadcrumb, PageHeader } from "antd";


const BaseHeader = (props) => {

  let params = { ...props };

  delete params.children;
  params.extra = props.children;

  const Bread = () => (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Next</Breadcrumb.Item>
    </Breadcrumb>
  )

  return <PageHeader breadcrumbRender={Bread} {...params} />;
};

export default BaseHeader;
