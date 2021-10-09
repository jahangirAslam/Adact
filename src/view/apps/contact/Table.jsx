import { useState, useEffect } from "react";

// Redux
import { getAllData, getData } from "../../../redux/contact/contactActions";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Button, Input, Table, Card } from "antd";
import { RiUserAddLine, RiSearchLine } from "react-icons/ri";

import { columns } from "./columns";
import AddNewUser from "./Modal";

export default function UsersList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Redux
  const dispatch = useDispatch();
  const store = useSelector((state) => state.contact);

  // Sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        q: val,
      })
    );
  };

  // Get Data 
  useEffect(() => {
    dispatch(getAllData());

    dispatch(
      getData({
        q: searchTerm,
      })
    );
  }, [dispatch, store.data.length]);

  const data = [];
  for (let i = 0; i < store.data.length; i++) {
    data.push({
      key: store.data[i].id,
      fullName: store.data[i].fullName,
      role: store.data[i].role,
      contact: store.data[i].contact,
      email: store.data[i].email,
      status: store.data[i].status,
    });
  }

  return (
    <Card className="da-contact-card da-mb-32">
      <Row className="da-m-24" justify="space-between" align="middle">
        <Col xs={24} md={12} xl={8}>
          <Input
            placeholder="Search"
            prefix={<RiSearchLine />}
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </Col>

        <Col xs={24} md={8} xl={4}>
          <Button
            block
            className="da-float-right da-mt-sm-24"
            type="primary"
            onClick={toggleSidebar}
            icon={<RiUserAddLine size={16} className="remix-icon" />}
          >
            Add New User
          </Button>
        </Col>
      </Row>

      <Col className="da-contact-card">
        <Table
          pagination={{ defaultPageSize: 6 }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'calc(500px + 50%)' }}
        />
      </Col>

      <AddNewUser open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Card>
  );
};