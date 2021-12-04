import React, {useState} from "react";
import {Button, DatePicker, Form, Input, Select, Row, Col} from "antd";
import {LoadingOutlined, CloseOutlined, DownOutlined} from '@ant-design/icons';
import {REQUEST_ACTIONS} from "@consts/actionTypes";
import {execWithLoadingState} from "@utils/helpers";

const BaseFilter = (props) => {
    const {filter, onFilter} = props;
    const [loader, setLoader] = useState('');
    const [options, setOptions] = useState([]);

    const onSuccess = (data) => {
        setOptions(data);
    }

    const onError = (err) => {
    }

    React.useEffect(() => {
        execWithLoadingState(setLoader, null, null, onSuccess, onError);
    }, []);

    const SelectField = ({filter}) => {
        let icon = null;
        if (loader === REQUEST_ACTIONS.REQUEST_LOADING) {
            icon = <LoadingOutlined/>;
        }
        if (loader === REQUEST_ACTIONS.REQUEST_SUCCESS) {
            icon = <DownOutlined/>;
        }
        if (loader === REQUEST_ACTIONS.REQUEST_ERROR) {
            icon = <CloseOutlined/>;
        }

        return <Form.Item name={filter.key}>
            <Select allowClear suffixIcon={icon} placeholder={filter.placeholder} options={options[filter.data_key]}>
            </Select>
        </Form.Item>;
    }

    return (
        <>
            <Form onFinish={onFilter}>
                <Row gutter={[8, 8]}>
                    {filter.map((value, index) => {
                        let item;
                        if (value.type === "text") {
                            item = <Col className="gutter-row" span={4}>
                                <InputField key={value.key} filter={value}/>
                            </Col>;
                        } else if (value.type === "select") {
                            item = <Col className="gutter-row" span={4}>
                                <SelectField key={value.key} filter={value}/>
                            </Col>;
                        } else if (value.type === "date") {
                            item = <Col className="gutter-row" span={4}>
                                <DateTimeField key={value.key} filter={value}/>
                            </Col>;

                        }
                        return item;
                    })}
                    <Col className="gutter-row" span={2.5}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Apply Filter</Button>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={2.5}>
                        <Form.Item>
                            <Button>Clear Filter</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default BaseFilter;

const InputField = ({filter}) => {
    return <Form.Item name={filter.key}>
        <Input placeholder={filter.placeholder}/>
    </Form.Item>;
}

const DateTimeField = ({filter}) => {
    return <Form.Item name={filter.key}>
        <DatePicker showTime/>
    </Form.Item>;
}
