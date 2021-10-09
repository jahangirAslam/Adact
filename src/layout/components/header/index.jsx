import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Layout, Button, Row, Col } from "antd";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Document, Upload, Calendar, Search, Buy } from "react-iconly";

import HeaderSearch from './HeaderSearch';
import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";

const { Header } = Layout;

export default function MenuHeader(props) {
  const { setVisible } = props;

  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  const searchClick = () => {
    setSearchHeader(true)

    setTimeout(() => {
      inputFocusRef.current.focus({
        cursor: 'start',
      });
    }, 200);
  }

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
    setSearchHeader(false);
  };

  return (
    <Header>
      <Row
        className="da-w-100 da-position-relative"
        align="middle"
        justify="space-between"
      >
        <Col className="da-mobile-sidebar-button da-mr-24">
          <Button
            className="da-mobile-sidebar-button"
            type="text"
            onClick={showDrawer}
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80"
              />
            }
          />
        </Col>

        <Col
          flex="1"
          style={{ display: !searchHeader ? 'none' : 'block' }}
          className={`da-pr-md-0 da-pr-16 da-header-search ${searchActive && "da-header-search-active"}`}
        >
          <HeaderSearch inputFocusProp={inputFocusProp} setSearchHeader={setSearchHeader} />
        </Col>

        {!searchHeader && (
          <Col
            xl={16}
            lg={14}
            className="da-header-left-text da-d-flex-center"
          >
            <Document
              set="curved"
              size="large"
              className="remix-icon da-update-icon da-text-color-primary-1 da-p-4 da-bg-color-primary-4"
            />
            <p className="da-header-left-text-item da-input-label da-text-color-black-100 da-ml-16 da-mb-0">
              Do you know the latest update of 2021? 🎉 &nbsp;
              <span className="da-font-weight-300 da-text-color-danger-3">
                An overview of our is now available on YouTube
              </span>

              <a
                href="#"
                className="da-ml-8 da-text-color-black-60"
              >
                <Upload set="curved" className="remix-icon" />
              </a>
            </p>
          </Col>
        )}

        <Col>
          <Row align="middle">
            <Col className="da-d-flex-center da-mr-4">
              {!searchHeader ? (
                <Button
                  type="text"
                  icon={
                    <Search
                      set="curved"
                      className="da-text-color-black-60"
                    />
                  }
                  onClick={() => searchClick()}
                />
              ) : (
                <Button
                  type="text"
                  icon={
                    <RiCloseLine
                      size={24}
                      className="da-text-color-black-60"
                    />
                  }
                  onClick={() => setSearchHeader(false)}
                />
              )}
            </Col>

            <Link to="/apps/calendar">
              <Col className="da-d-flex-center da-mr-4">
                <Button
                  type="text"
                  icon={
                    <Calendar
                      set="curved"
                      className="da-text-color-black-60"
                    />
                  }
                />
              </Col>
            </Link>

            <Link to="/apps/ecommerce/checkout">
              <Col className="da-d-flex-center da-mr-4">
                <Button
                  type="text"
                  icon={
                    <Buy
                      set="curved"
                      className="da-text-color-black-60"
                    />
                  }
                />
              </Col>
            </Link>

            <Col className="da-d-flex-center da-mr-sm-12 da-mr-16">
              <HeaderNotifications />
            </Col>

            <Col>
              <HeaderUser />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};