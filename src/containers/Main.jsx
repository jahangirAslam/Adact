import React, { useState, useEffect } from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import ScrollToTop from "react-scroll-up";
import { Layout, Button } from "antd";
import { RiArrowUpLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

import { getPermissions } from "@state/commonSlice";

import Sidebar from "./components/menu/Sidebar";
import MenuHeader from "./components/header";
import MenuFooter from "./components/footer";
import ModuleRoutes from "@mods/routes";


const Main = () => {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(getPermissions());
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Layout className="da-app-layout">
                <Sidebar visible={visible} setVisible={setVisible} />

                <Layout>
                    <MenuHeader setVisible={setVisible} />

                    <Layout.Content className="da-content-main">
                        <Switch>
                            <Route path={path} component={ModuleRoutes} />
                        </Switch>
                    </Layout.Content>

                    <MenuFooter />
                </Layout>
            </Layout>

            <div className="scroll-to-top">
                <ScrollToTop showUnder={300} style={{ bottom: "5%" }}>
                    <Button
                        className="da-primary-shadow"
                        type="primary"
                        shape="circle"
                        icon={<RiArrowUpLine />}
                    />
                </ScrollToTop>
            </div>
        </div>
    );
};

export default Main;
