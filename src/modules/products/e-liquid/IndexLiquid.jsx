import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ActionComponent, BodyComponent, CreateButton, FilterComponent, HeaderComponent, SelectionTable } from "@comps/components";
import { makeRequest, notify } from "@utils/helpers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getFilters } from "../allProducts/components/request";
import CreateProduct from "./components/CreateProducts";
import { deleteProduct, getAllProducts } from "./components/request";

const pageConfig = {
    headers: {
        title: "eLiquid",
        breadcrumb: [
            {
                name: "eLiquid",
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
            key: 'id',
            title: 'Product ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            key: 'customer_name',
            title: 'Client Name',
            dataIndex: 'customer_name',
            sorter: true,
        },

        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'name',
            title: 'On Marki',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'category_name',
            title: 'Category Name',
            dataIndex: 'category_name',
            sorter: true,
        },
        {
            key: 'withdrawn',
            title: 'WithDrawn',
            dataIndex: 'withdrawn',
            sorter: true,
        },
        {
            key: 'name',
            title: 'PG/VG',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'name',
            title: 'Nicotine',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'name',
            title: 'Type',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'name',
            title: 'Sub-Type',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'insights',
            title: 'Insight',
            dataIndex: 'insights',
            sorter: true,
        },


        {
            key: "actions",
            title: 'Actions',
            render: (record) => ActionComponentEx(record)
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
        makeRequest(setLoader, getAllProducts, payload, onSuccess, null);
    }

    const onSuccess = (response) => {
        debugger
        setTotalRecords(response.recordsTotal);
        setDataSource(response.data);
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
                <SelectionTable loader={loader} columns={columns} dataSource={dataSource} rowSelection={rowSelection} onChange={handleTableChange} />
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
        key: 'client',
        placeholder: 'Client Name',
        type: 'select',
        data_key: 'customers',

    },
    {
        key: 'name',
        placeholder: 'Name',
        type: 'text',
    },
    {
        key: 'name',
        placeholder: 'On Marki',
        type: 'text',
    },
    {
        key: 'withdrawn',
        placeholder: 'Withdrawn',
        type: 'select',
        data_key: 'withdrawn',
    },
    {
        key: 'name',
        placeholder: 'PG/VG',
        type: 'text',
    },
    {
        key: 'name',
        placeholder: 'Nicotine',
        type: 'text',
    },

    {
        key: 'type',
        placeholder: 'Type',
        type: 'select',
        data_key: 'type',

    },
    {
        key: 'type',
        placeholder: 'Sub-Type',
        type: 'select',
        data_key: 'type',

    },
    {
        key: 'insights',
        placeholder: 'Insight',
        type: 'select',
        data_key: 'insights',

    },

];
