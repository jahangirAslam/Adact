import { Form, Input, InputNumber, Table } from 'antd';
import React from 'react';
// const originData = [];



const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber style={{ width: "100%" }} /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = (props) => {
    let { columns, loader, isEditing, form, cancel, rowSelection ,  ...otherProps  } = props;


    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'percentage' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                rowKey="id" size="small" {...otherProps}
                rowSelection={{

                    ...rowSelection,
                }}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={props.dataSource}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                loading={loader}
            />
        </Form>
    );
};

export default EditableTable;