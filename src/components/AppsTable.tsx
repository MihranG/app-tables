import {Table, TablePaginationConfig} from "antd";
import {useState, FC, useEffect} from "react";
import {FilterValue, SorterResult} from "antd/es/table/interface";
import {ColumnsType} from "antd/lib/table";
import {IAllAppsResponse, IAppRow} from "../types.ts";
import {getAllApps} from "../api.ts";
import {AxiosResponse} from "axios";
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
        sorter: true,
        render: (name) => `${name}`,
        width: '20%',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: true,
        render: (category) => `${category}`,
        width: '40%',
    },
    {
        title: 'Connector',
        dataIndex: 'appSources',
        sorter: true,
        render: (sources) => sources.map((s: string)=>(`${s} `)),
        width: '40%',
    },
    ]
const AppsTable: FC = () =>{
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 25,
        },
    });
    const [data, setData] = useState<IAppRow[]>([])
    useEffect(()=>{
        getAllApps().then((res: AxiosResponse<IAllAppsResponse>)=> {
            if(res?.data.appRows){
                setData(res.data.appRows)
            }
        })
    },[])

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue>,
        sorter: SorterResult<IAppRow>,
    )=>{
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    }
    return <Table
            columns={columns}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
}

export default AppsTable
