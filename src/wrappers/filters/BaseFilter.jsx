import React, { useState, useEffect } from "react";
import { Button, DatePicker, Input, Select, Row, Col, Form } from "antd";
import { makeRequest } from "@utils/helpers";

const BaseFilter = (props) => {
    const { filters, onFilter, api } = props;
    // eslint-disable-next-line
    const [loader, setLoader] = useState(false);
    const [options, setOptions] = useState([]);
    // const [selected, setSelected] = useState({});
    var selected = {}
    const onSuccess = (data) => {
        setOptions(data);
    }

    useEffect(() => {
        if (api) {
            makeRequest(setLoader, api, null, onSuccess, null);
        }
        // eslint-disable-next-line
    }, []);

    const onSubmit = () => {
        onFilter(selected);
    }

    const onReset = () => {
        selected = {};
        onFilter({});
    }

    const onChange = (key, value, each) => {
        if (each && each.type === "text") {
            selected = { ...selected, [key]: value.target.value };

        } else {

            selected = { ...selected, [key]: value };

        }
    }

    const InputField = ({ each }) => (
        <Input placeholder={each.placeholder} value={selected[each.key]} onChange={val => onChange(each.key, val, each)} />
    )
    const DateTimeField = ({ each }) => (
        <DatePicker value={selected[each.key]} onChange={val => onChange(each.key, val)} />
    )
    const SelectField = ({ each }) => (
        <Select allowClear placeholder={each.placeholder} options={options[each.data_key]} value={selected[each.key]} onChange={val => onChange(each.key, val)} ></Select>
    )
    const FilterField = (each, i) => {
        let item = null;
        switch (each.type) {
            case 'text':
                item = <InputField className="da-w-100" each={each} />;
                break;
            case 'date':
                item = <DateTimeField className="da-w-100" each={each} />;
                break;
            case 'select':
                item = <SelectField className="da-w-100 " each={each} />;
                break;
            default:
                return null;
        }
        return (
            <Col key={i} className="gutter-row" sm={12} xs={24} md={6} >
                <Form.Item>{item}</Form.Item>
            </Col>
        );
    }

    return (
        <div className="da-my-18">
            <Row gutter={[16]}>
                {filters.map((value, index) => FilterField(value, index))}
            </Row>
            <Row gutter={[16]}>
                <Col className="gutter-row" span={2.5} offset={8}>
                    <Button type="primary" onClick={onSubmit} state={loader}>Apply Filter</Button>
                </Col>
                <Col className="gutter-row" span={2.5}>
                    <Button onClick={onReset}>Clear Filter</Button>
                </Col>
            </Row>
        </div>
    );
};

export default BaseFilter;

