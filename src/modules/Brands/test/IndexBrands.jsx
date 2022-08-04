import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, HeaderComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateTest from "./components/CreateTest";
// import { deleteItems, getAllItems, getFilters } from "./components/request";
import { deleteItems, getAllItems, getFilters } from "./components/request";
const pageConfig = {
    headers: {
        title: "Manage Brands",
        breadcrumb: [
            {
                name: "Brands",
            }
        ]
    }
}

const IndexBrands = () => {
    var delItems = []
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const [filters, setFilters] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [childComponent, setChildComponent] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 25,
        sortName: 'id',
        sortType: 'desc'
    });

    const columns = [
        {
          key: "customer_name",
          title: "Customer name ",
          dataIndex: "customer_name",
          sorter: true,
        },
        {
          key: "product_name",
          title: "Product name ",
          dataIndex: "product_name",
          sorter: true,
        },
        {
          key: "name",
          title: "Brand Name",
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
          title: "Withdraw",
          dataIndex: "brand_withdraw",
          sorter: true,
        },
        {
          key: "created_at",
          title: "Launch Date",
          dataIndex: "created_at",
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
          key: "country_name",
          title: "Market",
          dataIndex: "country_name",
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
            <ActionComponent each={record} onView={onView} onEdit={onEdit} onDelete={onDelete}>
            </ActionComponent>
        );
    }


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
            filters
        };
        makeRequest(setLoader, getAllItems, payload, onSuccess, null);
    }

    const onSuccess = (response) => {
        setTotalRecords(response.recordsTotal);
        setDataSource(response.data);
    }

    const handleTableChange = (page, fil, sorter) => {
        let payload = {
            ...pagination,
            current: page.current,
            pageSize: page.pageSize,
            sortName: sorter.field || 'id',
            sortType: sorter.order === 'ascend' ? 'asc' : 'desc',
        };
        setPagination(payload);
    }
    //deleted multi Items
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems = []
            delItems = selectedRowKeys
        },
    };

    // Create component modal
    const onCreate = () => {
        setChildComponent(<CreateTest onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/product/brands/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }
    const onView = (record) => {
        history.push(`/product/brands/view/${record.id}`);

    }
    const onEdit = (record) => {
        history.push(`/product/brands/edit/${record.id}`);
    }

    const onDelete = (record) => {
        let index = delItems.findIndex(o => o === record.id);
        if (index === -1) {
            delItems.push(record.id)
        }
        const payload = { "ids": delItems };
        makeRequest(setLoader, deleteItems, payload, onDeleteSuccess, onError)
    }

    const onDeleteSuccess = (response, msg) => {
        getProducts()
        notify(msg.msg)
    }

    const onError = (error, msg) => {
        notify(msg.message)
    }

    return (
        <>
            {childComponent}
            <HeaderComponent headers={pageConfig.headers}>
                <CreateButton onClick={onCreate} />
            </HeaderComponent>
            <BodyComponent>
                <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} onChange={handleTableChange} rowSelection={rowSelection} />
            </BodyComponent>
        </>
    );
}

export default IndexBrands;

const availableFilters = [
  {
    key: "customer_name",
    placeholder: "Customer Name",
    type: "text",
 
  },
 
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
      placeholder: "Withdraw",
      type: "select",
      data_key: "withdrawn",
    },
    {
      key: "launched_date",
      placeholder: "Launch Date",
      type: "text",
      data_key: "launched_date",
    },

    {
      key: "units",
      placeholder: "Units",
      type: "text",
   
    },
    {
      key: "market",
      placeholder: "Market",
      type: "text",
   
    },
    {
      key: "id",
      placeholder: "ID",
      type: "text",
  
    },
   
  ];
