import { ActionComponent, BodyComponent, CreateButton, HeaderComponent, TableComponent,FilterComponent } from "@comps/components";
import { makeRequest, notify, removeById } from "@utils/helpers";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { getChemicalCompounds, deleteChemicalCompound, getFilters } from "./requests";
import CreateChemicalCompound from "./components/CreateChemicalCompound";
import { getChemicalCompounds,getFilters } from "./requests";
const pageConfig = {
    headers: {
        title: "Manage Template Variables ",
        breadcrumb: [
            {
                name: "Manage Variables",
                // path: "/component-management/chemical-compounds"
            }
        ]
    }
}

const IndexManageVariable = () => {

    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const [dataSource, setDataSource] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [filters, setFilters] = useState({});
    const [childComponent, setChildComponent] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 25,
        sortName: 'id',
        sortType: 'desc'
    });

    const columns = [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        sorter: true,
      },
      {
        key: "description",
        title: "Description",
        dataIndex: "description",
        sorter: true,
      },
      
      {
        key: "is_active",
        title: "status",
        dataIndex: "is_active",
        sorter: true,
        render: (is_active) => {
          let color = is_active ? "green" : "red";
          let text = is_active ? "ACTIVE" : "INACTIVE";
          return <Tag color={color}>{text}</Tag>;
        },
      },
      
      {
        key: "actions",
        title: "Actions",
        render: (record) =>
          ActionComponent({ each: record, onEdit: onEdit, onDelete: onDelete }),
      },
    ];

    useEffect(() => {
      getAllChemicalCompounds();
      // eslint-disable-next-line
    }, [pagination, filters]);

    const getAllChemicalCompounds = () => {
        let payload = {
          start: pagination.current - 1,
          length: pagination.pageSize,
          sort_name: pagination.sortName,
          sort_type: pagination.sortType,
          filters,
        };
         makeRequest(setLoader, getChemicalCompounds, payload, onSuccess, null);
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
       setChildComponent(<CreateChemicalCompound onCreated={onCreated} />)
    }

    const onCreated = (res) => {
        if(res){
            history.push(`/global-template/manage-global-variable/edit/${res.data.object.id}`);
        }
        setChildComponent(null);
    }

    const onEdit = (record) => {
      history.push(`/global-template/manage-global-variable/edit/${record.id}`);
    }

    const onDelete = (record) => {
      //     onError)
    }

      // makeRequest(setLoader, deleteChemicalCompound, record.id, onDeleteSuccess,
    const onDeleteSuccess = (response, msg) => {
        setDataSource(removeById(dataSource, response.id));
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
}

export default IndexManageVariable;

const availableFilters = [
  {
    key: "name",
    placeholder: "Name",
    type: "text",
  },
  
];
