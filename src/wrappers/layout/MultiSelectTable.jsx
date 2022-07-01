import { Button, Table } from 'antd';
import React, { useMemo, useRef } from 'react';
import { CSVLink } from "react-csv"
import { useReactToPrint } from 'react-to-print';


const MultiSelectTable = (props) => {

    let { columns, loader, rowSelection, ...otherProps } = props;
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const tab = useMemo(() => <div>
        <Button onClick={handlePrint} type="primary" danger> Export to PDF </Button>
        <CSVLink
            filename={"Expense_Table.csv"}
            data={props.dataSource}
            className="btn btn-primary"
        >
            Export to CSV
        </CSVLink>
        {props.dataSource &&
            <div ref={componentRef}>
                <Table
                    defaultExpandAllRows={true}
                    rowKey="id" size="small" {...otherProps}
                    rowSelection={{

                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={props.dataSource}
                    loading={loader}
                />
            </div>
        }



    </div>, [otherProps.dataSource, loader])
    return tab;
};

export default MultiSelectTable;
