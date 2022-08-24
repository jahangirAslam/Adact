import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  ActionComponent,
  BodyComponent,
  CreateButton,
  FilterComponent,
  HeaderComponent,
  SelectionTable,
  Dropzone,
} from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateAttachment from "./CreateAttachment.jsx";
import {
  deleteProduct,
  getAllProducts,
  getFilters,
} from "./request";

// const pageConfig = {
//   headers: {
//     title: "Products list/All Types",
//     breadcrumb: [
//       {
//         name: "All Products",
//       },
//     ],
//   },
// };

const Attachment = () => {
  var delItems = [];
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [filters, setFilters] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [childComponent, setChildComponent] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25,
    sortName: "id",
    sortType: "desc",
  });

  const columns = [
    {
      key: "file_name",
      title: "File Name",
      dataIndex: "file_name",
      sorter: true,
    },
    {
        key: "file_type",
        title: "File type",
        dataIndex: "file_type",
        sorter: true,
      },
    {
      key: "file_size",
      title: "File Size (byte)",
      dataIndex: "file_size",
      sorter: true,
    },

    {
      key: "category",
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
        key: "subject",
        title: "Subject ",
        dataIndex: "subject",
        sorter: true,
      },

    {
      key: "slot",
      title: "Slot",
      dataIndex: "slot",
      sorter: true,
    },

    {
      key: "submission",
      title: " Submission",
      dataIndex: "submission",
      sorter: true,
    },
    {
        key: "attachment",
        title: " Attachment",
        dataIndex: "ttachment",
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
    getProducts();
    // eslint-disable-next-line
  }, [pagination, filters]);

  const getProducts = () => {
    let payload = {
      start: pagination.current - 1,
      length: pagination.pageSize,
      sort_name: pagination.sortName,
      sort_type: pagination.sortType,
      filters,
    };
    makeRequest(setLoader, getAllProducts, payload, onSuccess, null);
  };

  const onSuccess = (response) => {
    setTotalRecords(response.recordsTotal);
    let data = [];
   
    response.data.forEach(element => {
    
      data.push({ ...element, type: element.e_type ? element.e_type[0].type +  "\nand " +  element.category_name  : element.category_name , withdrawn_date:element.withdrawn ? element.withdrawn:"No" , edId:`${element.ecid}-${element.ec_five}`})
    
    });
    setDataSource(data);
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

  //deleted multi Items
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      delItems = [];
      delItems = selectedRowKeys;
    },
  };

  // Create component modal
  const onCreate = () => {
    setChildComponent(<CreateAttachment onCreated={onCreated} />);
  };

  const onCreated = (res) => {
    if (res) {
      history.push(`/products/product/edit/${res.data.object.id}`);
    }
    setChildComponent(null);
  };
  const onView = (record) => {
    history.push(`/products/product/view/${record.id}`);
  };
  const onEdit = (record) => {
    history.push(`/products/product/edit/${record.id}`);
  };

  const onDelete = (record) => {
    let index = delItems.findIndex((o) => o === record.id);
    if (index === -1) {
      delItems.push(record.id);
    }
    const payload = { ids: delItems };
    makeRequest(setLoader, deleteProduct, payload, onDeleteSuccess, onError);
  };

  const onDeleteSuccess = (response, msg) => {
    getProducts();
    notify(msg.msg);
  };

  const onError = (error, msg) => {
    notify(msg.message);
  };

  return (
    <>
      {childComponent}
      <div className="createBtn">
        <CreateButton onClick={onCreate} />
        </div>
      <BodyComponent>
        <FilterComponent
          filters={availableFilters}
          onFilter={setFilters}
          api={getFilters}
        />
        <Row>
          <Col md={24}>
            <SelectionTable
              className="table-show"
              loader={loader}
              columns={columns}
              dataSource={dataSource}
              rowSelection={rowSelection}
              onChange={handleTableChange}
            />
          </Col>
        </Row>
      </BodyComponent>
    </>
  );
};

export default Attachment;

const availableFilters = [
  {
    key: "File Name",
    placeholder: "file_name ",
    type: "text",
  },
  {
    key: "category",
    placeholder: "Category",
    type: "select",
    data_key: "category",
  },
  {
    key: "subject",
    placeholder: "Subject",
    type: "select",
    data_key: "subject",

  },
 
];
