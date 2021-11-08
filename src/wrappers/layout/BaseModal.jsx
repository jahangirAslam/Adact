import {Modal, Typography} from "antd";
import React from "react";


const BaseModal = (props) => {

    let title = <Typography.Text>{props.mainTitle}</Typography.Text>
    if (props.subTitle) {
        title = (
            <>
                {title}
                <Typography.Text type="secondary"> | {props.subTitle}</Typography.Text>
            </>
        );
    }
    return <Modal width="500px" title={title} {...props} bodyStyle={{padding: "20px"}} >{props.children}</Modal>;
};

export default BaseModal;
