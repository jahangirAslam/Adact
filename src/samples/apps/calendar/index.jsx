import React, { useState, useEffect } from "react";

import { Layout, Row, Col, Card, Button, Drawer } from "antd";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";

// Component
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import AddEventSidebar from "./AddEventSidebar";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent,
} from "../../../redux/calendar/calendarActions";

// Colors
const calendarsColor = {
  Travel: "travel",
  Social: "social",
  Work: "work",
  Important: "important",
};

const { Sider, Content } = Layout;

export default function Calender() {
  const [calendarApi, setCalendarApi] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawervisible, setIsDrawerVisible] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Object
  const blankEvent = {
    title: "",
    start: "",
    end: "",
    allDay: false,
    url: "",
    extendedProps: {
      calendar: "",
      guests: [],
      location: "",
      description: "",
    },
  };

  // RefetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  // Fetch Events
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars));
  }, []);

  return (
    <Layout className="da-calendar da-mb-32">
      <Drawer
        title=" "
        className="da-calendar-mobile-menu"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={isDrawervisible}
        closeIcon={
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        }
      >
        <Sidebar
          store={store}
          dispatch={dispatch}
          updateFilter={updateFilter}
          updateAllFilters={updateAllFilters}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
        />
      </Drawer>

      <Content>
        <Row className="da-calendar-mobile-menu-btn da-bg-color-black-0 da-border-radius da-py-12 da-px-sm-8 da-px-24 da-mb-16">
          <Button
            className="da-p-0"
            type="text"
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80"
              />
            }
            onClick={showDrawer}
          />
        </Row>

        <Card>
          <Row>
            <Sider
              className="da-border-right-1 da-py-24 da-mr-24"
              theme="light"
              width={256}
            >
              <Sidebar
                store={store}
                dispatch={dispatch}
                updateFilter={updateFilter}
                updateAllFilters={updateAllFilters}
                showModal={showModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isModalVisible={isModalVisible}
              />
            </Sider>

            <Col flex="1 1" className="da-py-24">
              <Calendar
                store={store}
                dispatch={dispatch}
                blankEvent={blankEvent}
                calendarApi={calendarApi}
                selectEvent={selectEvent}
                updateEvent={updateEvent}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                showModal={showModal}
              />
            </Col>
          </Row>
        </Card>

        <AddEventSidebar
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          selectEvent={selectEvent}
          updateEvent={updateEvent}
          removeEvent={removeEvent}
          calendarApi={calendarApi}
          refetchEvents={refetchEvents}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          showModal={showModal}
        />
      </Content>
    </Layout>
  );
}
