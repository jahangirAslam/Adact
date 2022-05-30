import { Button, Checkbox, Col, Row } from "antd";
import React from "react";
import { RiCalendarEventLine } from "react-icons/ri";
import illustration from "../../../assets/images/apps/calendar/sidebar.svg";



// Filters
const filters = [
  {
    label: "Travel",
    color: "travel",
  },
  {
    label: "Social",
    color: "social",
  },
  {
    label: "Work",
    color: "work",
  },
  {
    label: "Important",
    color: "important",
  },
];

const Sidebar = (props) => {
  const { updateFilter, updateAllFilters, showModal, store, dispatch } = props;

  return (
    <Row className="da-h-100 da-pr-24">
      <Col span={24}>
        <h3>YodaCalendar</h3>

        <Button
          className="da-mt-16"
          type="primary"
          onClick={showModal}
          block
          icon={<RiCalendarEventLine className="remix-icon" size={17} />}
        >
          New Event
        </Button>

        <h5 className="da-mt-48">Calendars</h5>

        <Checkbox
          className="da-mb-8"
          id="view-all"
          checked={store.selectedCalendars.length === filters.length}
          onChange={(e) => dispatch(updateAllFilters(e.target.checked))}
        >
          Select All
        </Checkbox>

        <div className="da-calendar-checkbox-list">
          {filters.length &&
            filters.map((filter, index) => {
              return (
                <Checkbox
                  key={index}
                  id={filter.label}
                  onChange={() => dispatch(updateFilter(filter.label))}
                  checked={store.selectedCalendars.includes(filter.label)}
                  defaultChecked={true}
                  className="da-mb-8"
                  data-color={filter.color}
                >
                  {filter.label}
                </Checkbox>
              );
            })}
        </div>
      </Col>

      <Row
        className="da-calendar-menu-footer da-w-100"
        align="bottom"
        justify="center"
      >
        <img src={illustration} alt="illustration" />
      </Row>
    </Row>
  );
};

export default Sidebar;
