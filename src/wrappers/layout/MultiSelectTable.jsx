import { Button, Table } from 'antd';
import React, { useMemo, useRef } from 'react';
import { Col, Row } from 'antd';
import { CSVLink } from "react-csv"
import { useReactToPrint } from 'react-to-print';


const MultiSelectTable = (props) => {

    let { columns, loader, rowSelection, ...otherProps } = props;
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const tab = useMemo(() => <div>
        <Row>
      <Col className='csvPdfBtn' span={24} md={24}>
      <Button className='pdfBtn' onClick={handlePrint} type="primary" danger> Export to PDF </Button>
        <CSVLink
            filename={"Expense_Table.csv"}
            data={props.dataSource}
            className="csvBtn"
        >
            Export to CSV
        </CSVLink>
      </Col>
    </Row>

        
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
