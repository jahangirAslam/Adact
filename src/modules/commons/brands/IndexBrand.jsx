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
import { useHistory } from "react-router-dom";
import ViewBrand from "./components/ViewBrand.jsx";
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

const IndexBrand = () => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [filters, setFilters] = useState({});
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
      key: "customer_name",
      title: "Customer Product ",
      dataIndex: "customer_name",
      sorter: true,
    },
    {
      key: "name",
      title: "Brand Na ",
      dataIndex: "name",
      sorter: true,
    },
    {
      key: "sub_name",
      title: "Sub Brand ",
      dataIndex: "sub_name",
      sorter: true,
    },
    {
      key: "brand_withdraw",
      title: "WithDraw",
      dataIndex: "brand_withdraw",
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
      key: "units",
      title: "Units",
      dataIndex: "units",
      sorter: true,
    },
    {
      key: "market",
      title: "Market",
      dataIndex: "market",
      sorter: true,
    },
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      sorter: true,
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
    setChildComponent(<ViewBrand onUpdated={onUpdated} id={record.id} />);
  };

  const onEdit = (record) => {
    history.push(`/common/brands/edit/${record.id}`);
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

export default IndexBrand;

const availableFilters = [
 
  {
    key: "name",
    placeholder: "Brand Name",
    type: "text",
 
  },
  {
    key: "sub_name",
    placeholder: "Sub Brand",
    type: "text",
    
  },
  {
    key: "brand_withdraw",
    placeholder: "WithDraw",
    type: "select",
    data_key: "withdrawn",
  },
  {
    key: "units",
    placeholder: "Units",
    type: "text",
 
  },
  {
    key: "market",
    placeholder: "Maret",
    type: "text",
 
  },
  {
    key: "id",
    placeholder: "ID",
    type: "text",

  },
 
];
