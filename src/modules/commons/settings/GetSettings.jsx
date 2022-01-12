import { useState, useEffect } from "react";
import { getSettingByGroup, updateSetting } from "./request";
import { Row, Col, Switch } from 'antd';
import { makeRequest, notify, replaceById } from "@utils/helpers";

export const GetSettings = (props) => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    const getData = () => {
        makeRequest(setLoader, getSettingByGroup, props.group, onDataSuccess, onError);
    }

    const onDataSuccess = (res) => {
        setData(res.data);
    }

    const onError = () => {
        notify("Setting", "Error in Loading Settings");
    }

    const onChange = (event, res) => {
        let payload = { "id": res.id, "group": res.group, "key": res.key, "value": event }
        makeRequest(Function, updateSetting, payload, onSuccess, onError);

    }

    const onSuccess = (res, response) => {
        setData(replaceById(data, res.object));
        notify("Setting", response.msg);
    }


    return (
        <>
            { data.length > 0 ?
                <>
                    { data.map((res, index) =>
                        <div className="da-border-1 da-p-12" key={ index }>
                            <Row loader={ loader }>
                                <Col span={ 12 }>
                                    <strong>{ res.key }</strong>
                                </Col>
                                <Col span={ 12 }>
                                    <Switch disabled={ props.disable } defaultChecked={ res.value } onChange={ (event) => onChange(event, res) } />
                                </Col>
                            </Row>
                        </div>
                    )
                    }
                </>
                : <Row><Col span={ 24 } className="da-text-center"><strong>no settings available</strong></Col></Row> }
        </>
    );

};
