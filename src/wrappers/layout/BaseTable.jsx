import React, { useMemo } from "react";
import { Table } from "antd";
import { REQUEST_ACTIONS } from "@consts/actionTypes";


const BaseTable = (props) => {
  let { columns, loader, ...otherProps } = props;

  let loading = false;
  if (loader === REQUEST_ACTIONS.REQUEST_PENDING || loader === REQUEST_ACTIONS.REQUEST_LOADING) {
    loading = true;
  }

  const tab = useMemo(() => <Table rowKey="id" {...otherProps} columns={columns} showSorterTooltip={false} tableLayout="fixed" loading={loading} />, [otherProps.dataSource, loading]);// eslint-disable-line react-hooks/exhaustive-deps
  return tab;
};

export default BaseTable;
