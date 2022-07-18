import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeaderComponent, BodyComponent, TableComponent, ActionComponent, CreateButton,FilterComponent } from "@comps/components";
import { makeRequest, removeById, formatCompleteDataTime, notify, replaceById } from "@utils/helpers";
import { getBrands, deleteBrand,getFilters } from "./requests";
import ViewBrand from "./components/ViewBrand.jsx";
import { Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";




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
        sortName: 'id',
        sortType: 'desc'
    });

    const [childComponent, setChildComponent] = useState(null);

    const columns = [

        {
            key: 'custom_id',
            title: 'Customer Product ',
            dataIndex: 'custom_id',
            sorter: true,
        },
        {
            key: 'name',
            title: 'Brand Na ',
            dataIndex: 'name',
            sorter: true,
        },
        {
            key: 'sub_name',
            title: 'Sub Brand ',
            dataIndex: 'sub_name',
            sorter: true,
        },
        {
            key: 'trading_name',
            title: 'With Draw',
            dataIndex: 'trading_name',
            sorter: true,
        },
        {
            key: 'trading_name',
            title: 'Launch Date',
            dataIndex: 'trading_name',
            sorter: true,
        },
        {
            key: 'status',
            title: 'Status',
            sorter:true,
            dataIndex: 'is_active',
            render: (is_active) => {
                let color = is_active ? 'green' : 'red';
                let text = is_active ? 'ACTIVE' : 'INACTIVE';
                return (
                    <Tag color={color} >{text}</Tag>
                );
            }
        },
        {
            key: 'units',
            title: 'Units',
            dataIndex: 'units',
            sorter: true,
        },
        {
            key: 'market',
            title: 'Market',
            dataIndex: 'market',
            sorter: true,
        },
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
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

    // Create component modal
    const onCreate = () => {
        history.push(`/common/brands/create`);
    }

    const onView = (record) => {
        setChildComponent(<ViewBrand onUpdated={ onUpdated } id={ record.id } />);
    }

    const onEdit = (record) => {
        history.push(`/common/brands/edit/${record.id}`);
    }

    const onUpdated = (res) => {
        if (res) {
            setDataSource(replaceById(dataSource, res));
        }
        setChildComponent(null);
    }

    const onDelete = (record) => {
        makeRequest(setLoader, deleteBrand, record.id, onDeleteSuccess,
            onError)
    }

    const onDeleteSuccess = (response, msg) => {
        setDataSource(removeById(dataSource, response.id));
        notify(msg.msg)
    }

    const onError = (error, msg) => {
        notify(msg.message)
    }

    return (
        <>
            { childComponent }
            {/* <HeaderComponent headers={ pageConfig.headers }>
                <CreateButton onClick={ onCreate } />
            </HeaderComponent> */}
            
            <BodyComponent>
            <FilterComponent filters={availableFilters} onFilter={setFilters} api={getFilters} />
                <TableComponent loader={ loader } columns={ columns } dataSource={ dataSource } pagination={ { ...pagination, total: totalRecords } } onChange={ handleTableChange } />
            </BodyComponent>
        </>
    );
}

export default IndexBrand;

const availableFilters = [

    {
        key: 'name',
        placeholder: 'Customer Product',
        type: 'text',
        data_key: 'name'
    },
    {
        key: 'country_id',
        placeholder: 'Brand Na',
        type: 'select',
        data_key: 'country_id'
    },
    {
        key: 'email',
        placeholder: 'Sub Brand',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: 'With Draw',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: 'Launch Date',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: ' Status',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: 'Units',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: 'Markit',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: 'ID',
        type: 'text',
        data_key: 'email'
    },
    {
        key: 'email',
        placeholder: 'Action',
        type: 'text',
        data_key: 'email'
    },
    



];

