import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  ActionComponent,
  BodyComponent,
  FilterComponent,
  TableComponent,
} from "@comps/components";
import { makeRequest, notify, removeById, replaceById } from "@utils/helpers";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import ViewBrand from "./components/ViewBrand.jsx";
import { deleteBrand, getBrands, getFilters } from "./requests";

// const pageConfig = {
//     headers: {
//         title: "Brands",
//         breadcrumb: [
//             {
//                 name: "Brands",
//                 path: "/common/brands"
//             }
//         ]
//     }
// }

const IndexProduct = () => {
  const {id}  = useParams ()
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [filters, setFilters] = useState({customer_id:id});
  const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
    sortName: "id",
    sortType: "desc",
  });

  const [childComponent, setChildComponent] = useState(null);

  const columns = [
    {
      key: "id",
      title: " Product ID ",
      dataIndex: "id",
      sorter: true,
    },
    {
      key: "name",
      title: " Name ",
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "on_market",
      title: "On Markit ",
      dataIndex: "on_market",
      sorter: true,
    },
    {
      key: "withdrawn",
      title: "Withdrawn",
      dataIndex: "withdrawn",
      sorter: true,
    },
    {
      key: "type",
      title: " Type",
      dataIndex: "type",
      sorter: true,
    },
    {
      key: "status",
      title: "Status",
      sorter: true,
      dataIndex: "is_active",
      render: (is_active) => {
        let color = is_active ? "green" : "red";
        let text = is_active ? "ACTIVE" : "INACTIVE";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    
    

    {
      key: "actions",
      title: "Actions",
      render: (record) => ActionComponentEx(record),
    },
  ];

  const ActionComponentEx = (record) => {
    let icon = null;
    if (record) {
      if (record.is_active) {
        icon = <CloseOutlined className="icon-style da-text-color-danger-1" />;
      } else {
        icon = <CheckOutlined className="icon-style da-text-color-success-1" />;
      }
    }
    return (
      <ActionComponent
        each={record}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      ></ActionComponent>
    );
  };

  useEffect(() => {
    getAllBrands();
    // eslint-disable-next-line
  }, [pagination]);

  const getAllBrands = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters
    };
    makeRequest(setLoader, getBrands, payload, onSuccess, null);
  };

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    setDataSource(response.data);
  };

  const handleTableChange = (page, fil, sorter) => {
    let payload = {
      ...pagination,
      current: page.current,
      pageSize: page.pageSize,
      sortName: sorter.field || "id",
      sortType: sorter.order === "ascend" ? "asc" : "desc",
    };
    setPagination(payload);
  };

  // Create component modal
  const onCreate = () => {
    history.push(`/common/brands/create`);
  };

  const onView = (record) => {
    // setChildComponent(<ViewBrand onUpdated={onUpdated} id={record.id} />);
  };

  const onEdit = (record) => {
    history.push(`/products/product/edit/${record.id}`);
  };

  const onUpdated = (res) => {
    if (res) {
      setDataSource(replaceById(dataSource, res));
    }
    setChildComponent(null);
  };

  const onDelete = (record) => {
    makeRequest(setLoader, deleteBrand, record.id, onDeleteSuccess, onError);
  };

  const onDeleteSuccess = (response, msg) => {
    setDataSource(removeById(dataSource, response.id));
    notify(msg.msg);
  };

  const onError = (error, msg) => {
    notify(msg.message);
  };

  return (
    <>
      {childComponent}
      {/* <HeaderComponent headers={ pageConfig.headers }>
                <CreateButton onClick={ onCreate } />
            </HeaderComponent> */}

      <BodyComponent>
        <FilterComponent
          filters={availableFilters}
          onFilter={setFilters}
          api={getFilters}
        />
        <TableComponent
          loader={loader}
          columns={columns}
          dataSource={dataSource}
          pagination={{ ...pagination, total: totalRecords }}
          onChange={handleTableChange}
        />
      </BodyComponent>
    </>
  );
};

export default IndexProduct;

const availableFilters = [
  {
    key: "product_id",
    placeholder: "Product ID",
    type: "text",
    data_key: "product_id",
  },
  {
    key: "name",
    placeholder: " Name",
    type: "text",
    data_key: "name",
  },
  {
    key: "on_markit",
    placeholder: "On Markit",
    type: "text",
    data_key: "email",
  },
  {
    key: "withdrawn",
    placeholder: "With Drawn",
    type: "text",
    data_key: "withdrawn",
  },
  {
    key: "type",
    placeholder: "Type",
    type: "text",
    data_key: "type",
  },
  
  
];
