import { Table } from 'antd';
import React, { useMemo } from 'react';


const MultiSelectTable = (props) => {
    let { columns, loader, rowSelection, ...otherProps } = props;

    const tab = useMemo(() => <div>


        <Table
            rowKey="id" size="small" {...otherProps}
            rowSelection={{

                ...rowSelection,
            }}
            columns={columns}
            dataSource={props.dataSource}
            loading={loader}
        />

    </div>, [otherProps.dataSource, loader])
    return tab;
};

export default MultiSelectTable;
