import {Table, TablePaginationConfig} from "antd";
import {useState, FC, useEffect} from "react";
import {FilterValue} from "antd/es/table/interface";
import {ColumnsType} from "antd/lib/table";
import {IAllAppsResponse, IAppRow} from "../types.ts";
import {getAllApps} from "../api.ts";
import {AxiosResponse} from "axios";
import AppModal from "./AppModal.tsx";
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<IAppRow> = [
    {
        title: 'Name',
        dataIndex: 'appName',
        render: (name) => `${name}`,
        width: '20%',
        sorter: (a, b) => {
            return a.appName.localeCompare(b.appName)
        },
    },

    {
        title: 'Category',
        dataIndex: 'category',
        render: (category) => `${category}`,
        width: '40%',
        sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
        title: 'Connector',
        dataIndex: 'appSources',
        render: (sources) => sources.map((s: string)=>(`${s} `)),
        width: '40%',
    },
    ]
const AppsTable: FC = () =>{
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 25,
        },
        // todo figure out way in antd to have custom pagination and after next fetch another part of data
    });
    const [data, setData] = useState<IAppRow[]>([])
    useEffect(()=>{
        getAllApps().then((res: AxiosResponse<IAllAppsResponse>)=> {
            if(res?.data.appRows){
                setData(res.data.appRows)
            }
        })
    },[])

    const [modalId, setModalId] = useState('')

    const handleTableChange = (
        pagination: TablePaginationConfig,
    )=>{
        console.log('handleTableChange', pagination)
        setTableParams({
            pagination,
        });
    }

    const onRowClick = (record: IAppRow) => {
       setModalId(record.appId)
    }
    return<>
        <Table
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            onRow={(r: IAppRow)=>({onClick:()=>{
                    onRowClick(r)
                }
            })}
            rowKey={(record) => record.appId}

    />
        <AppModal appId={modalId} setModalId={setModalId}/>
    </>
}

export default AppsTable
