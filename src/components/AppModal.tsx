import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import {getAppOverview, getAppUsers} from "../api.ts";
import {IAppRow} from "../types.ts";

interface IProps {
    appId: string,
    setModalId: (id: string)=>void
}
const AppModal: React.FC<IProps> = ({appId, setModalId}) => {
    const [appData, setAppData] = useState<IAppRow | null>(null)
    useEffect(()=>{
            if(appId){
                Promise.all([getAppOverview(appId), getAppUsers(appId)]).then((res) => {
                    if (res[0].data && res[1].data) {
                        const [appData, userData] = res
                        console.log(222, res)
                        setAppData({...appData.data.appOverview, ...userData.data})// todo set app data here to show it in the modal
                    }
                })
            }
    }
    ,[appId])

    return<Modal  title={appId}
                  centered
                  open={!!appId}
                  onOk={() => setModalId('')}
                  onCancel={() => setModalId('')}
                  width={1000}>

         {/* todo show data from appData */}
        {appData?.category}
    </Modal>
};

export default AppModal;
