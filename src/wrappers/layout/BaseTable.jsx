import React, { useMemo } from "react";
import { Table, Skeleton } from "antd";
import { REQUEST_ACTIONS } from "@consts/actionTypes";


const BaseTable = (props) => {
    let { columns, loader, ...otherProps } = props;
    const tab = useMemo(() => <Table rowKey="id" {...otherProps} columns={columns} showSorterTooltip={false} tableLayout="fixed" />, [otherProps.dataSource]);// eslint-disable-line react-hooks/exhaustive-deps

    if (loader === REQUEST_ACTIONS.REQUEST_PENDING || loader === REQUEST_ACTIONS.REQUEST_LOADING) {
        return <Skeleton active />;
    }

    return tab;
};

export default BaseTable;
