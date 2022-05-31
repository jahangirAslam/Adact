import { Table } from "antd";
import React, { useMemo } from "react";


const BaseTable = (props) => {
  let { columns, loader, ...otherProps } = props;

  const tab = useMemo(() => <Table rowKey="id" size="small" {...otherProps} columns={columns} showSorterTooltip={false} tableLayout="fixed" loading={loader} />, [otherProps.dataSource, loader]);// eslint-disable-line react-hooks/exhaustive-deps
  return tab;
};

export default BaseTable;