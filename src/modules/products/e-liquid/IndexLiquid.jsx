import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, HeaderComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateProduct from "./components/CreateProducts";
import { deleteProduct, getAllProducts ,getFilters } from "./components/request";

const pageConfig = {
    headers: {
        title: "Products List/E-Liquids",
        breadcrumb: [
            {
                name: "ELiquids",
            }
        ]
    }
}

const IndexLiquid = () => {
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
          key: "id",
          title: " Product ID ",
          dataIndex: "id",
          sorter: true,
        },
        {
            key: "customer_name",
            title: " Client Name ",
            dataIndex: "customer_name",
            sorter: true,
          },
        {
          key: "name",
          title: " Name ",
          dataIndex: "name",
          sorter: true,
        },
        // {
        //   key: "on_market",
        //   title: "On Market ",
        //   dataIndex: "on_market",
        //   sorter: true,
        // },
        {
          key: "withdrawn",
          title: "Withdrawn",
          dataIndex: "withdrawn",
          sorter: true,
        },
        {
            key: "pg/vg",
            title: "PG/VG",
            dataIndex: "pg/vg",
            sorter: true,
          },
          {
            key: "nicotine",
            title: "Nicotine",
            dataIndex: "nicotine",
            sorter: true,
          },
        {
          key: "type",
          title: " Type",
          dataIndex: "type",
          sorter: true,
        },
        {
            key: "type_name",
            title: " Sub Type",
            dataIndex: "type_name",
            sorter: true,
          },
        {
          key: "status",
          title: "Status",
          sorter: false,
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
            filters,
        };
        makeRequest(setLoader, getAllProducts, payload, onSuccess, null);
    }

    const onSuccess = (response) => {
        setTotalRecords(response.recordsTotal);
        let data = [];
       
        response.data.forEach(element => {
    
            data.push({ ...element, type: element.e_type ? element.e_type[0].type +  "\nand " +  element.category_name  : element.category_name })
        });
        setDataSource(data);
      };




    //deleted multi Items
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            delItems = []
            delItems = selectedRowKeys
        },
    };



    // Create component modal
    const onCreate = () => {
        setChildComponent(<CreateProduct onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/products/product/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }
    const onView = (record) => {
        history.push(`/products/product/view/${record.id}`);

    }
    const onEdit = (record) => {
        history.push(`/products/product/edit/${record.id}`);
    }

    const onDelete = (record) => {
        let index = delItems.findIndex(o => o === record.id);
        if (index === -1) {
            delItems.push(record.id)
        }
        const payload = { "ids": delItems };
        makeRequest(setLoader, deleteProduct, payload, onDeleteSuccess, onError)
    }

    const onDeleteSuccess = (response, msg) => {
        getProducts();
        notify(msg.msg)
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
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} pagination={{ ...pagination, total: totalRecords }} rowSelection={rowSelection}  onChange={handleTableChange} />
            </BodyComponent>
        </>
    );
}

export default IndexLiquid;
const availableFilters = [
    {
        key: 'prduct_id',
        placeholder: 'Product ID',
        type: 'text',
    },
    {
        key: 'customer_id',
        placeholder: 'Client Name',
        type: 'select',
        data_key: 'customers',

    },
    {
        key: 'name',
        placeholder: 'Name',
        type: 'text',
    },
    // {
    //     key: 'on_market',
    //     placeholder: 'On Market',
    //     type: 'on_market',
    // },
    {
        key: 'withdrawn',
        placeholder: 'Withdrawn',
        type: 'select',
        data_key: 'withdrawn',
    },
    {
        key: 'pg/vg',
        placeholder: 'PG/VG',
        type: 'text',
    },
    {
        key: 'nicotine',
        placeholder: 'Nicotine',
        type: 'text',
    },

    {
        key: 'category_id',
        placeholder: 'Type',
        type: 'select',
        data_key: 'type',

    },
    {
        key: 'type_id',
        placeholder: 'Sub-Type',
        type: 'select',
        data_key: 'sub_type',

    },
    // {
    //     key: 'insights',
    //     placeholder: 'Insight',
    //     type: 'select',
    //     data_key: 'insights',

    // },

];