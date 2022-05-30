import React, { useMemo, useState } from 'react';
import { Table, Radio, Divider } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const BaseTable = (props) => {
  let { columns, loader, ...otherProps } = props;

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
  </div>)
  return tab;
};

export default BaseTable;
