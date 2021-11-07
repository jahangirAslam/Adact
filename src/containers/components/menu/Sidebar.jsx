import React, { useState, createElement, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

import {
    Layout,
    Drawer,
    Menu,
    Button,
    Row,
    Col,
} from "antd";

import {
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiCloseFill,
} from "react-icons/ri";

import MenuLogo from "./logo";
import navigation from "./navigation";
import { hasPermission } from "@utils/helpers";

// temp image
import logoSmall from "../../../assets/images/logo/logo-small.svg";

const { Sider } = Layout;

export default function Sidebar(props) {

    const { visible, setVisible } = props;
    const [collapsed, setCollapsed] = useState(false);

    // Location
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/")


    // Mobile Sidebar
    const onClose = () => {
        setVisible(false);
    };

    // Menu
    function toggle() {
        setCollapsed(!collapsed);
    }

    const trigger = createElement(
        collapsed ? RiMenuUnfoldLine : RiMenuFoldLine,
        {
            className: "trigger",
            onClick: toggle,
        }
    );

    const MemoizedMenuItems = useMemo(() => (
        <>
            {navigation.map((item, index) => MenuItem(item, index, '0'))}
        </>
    ), []);

    const MainMenu = () => {
        const menu = <Menu
            mode="inline"
            defaultOpenKeys={[
                splitLocation.length === 5
                    ? splitLocation[splitLocation.length - 3]
                    : null,
                splitLocation[splitLocation.length - 2],
            ]}
        >
            {MemoizedMenuItems}
        </Menu>;

        if (!visible) {
            return menu;
        }

        return <Drawer
            title={
                <MenuLogo onClose={onClose} />
            }
            className="da-mobile-sidebar"
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
            closeIcon={
                <RiCloseFill
                    className="remix-icon da-text-color-black-80"
                    size={24}
                />
            }
        >
            {menu}
        </Drawer>;
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme="light"
            width={256}
            className="da-sidebar"
        >
            <Row className="da-mr-12 da-ml-24 da-mt-24" align="bottom" justify="space-between">
                <Col>
                    {collapsed === false ? <MenuLogo onClose={onClose} /> : ""}
                </Col>

                <Col className="da-pr-0">
                    <Button
                        icon={trigger}
                        type="text"
                        className="da-float-right"
                    ></Button>
                </Col>

                {collapsed !== false && (
                    <Col className="da-mt-8">
                        <Link
                            to="/"
                            onClick={onClose}
                        >
                            <img className="da-logo" src={logoSmall} alt="logo" />
                        </Link>
                    </Col>
                )}
            </Row>
            <MainMenu />
        </Sider >
    );
};

const MenuItem = (each, i, k, uri = '/') => {
    let concat = `${k}-${i}`;
    if (!each.children || each.children === null) {
        each.children = [];
    }

    if (!hasPermission(each.permissionKey)) {
        return <></>;
    }

    // implement has children

    if (each.children.length) {
        return (
            <Menu.SubMenu key={concat} title={each.title} icon={each.icon}>
                {each.children.map((child, j) => MenuItem(child, j, concat, each.uri))}
            </Menu.SubMenu>
        );
    }
    return <Menu.Item key={concat} icon={each.icon} ><span><Link to={uri + each.uri}>{each.title}</Link></span></Menu.Item>;
}