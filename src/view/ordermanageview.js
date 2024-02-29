
import React from "react";
import OrderManage from "../components/ordermanage";
import RootHead from "../components/roothead";

function OrderManageView(props){
    return (
        <div className="order-manage-view">
            <RootHead profile={props.profile} closeWsConnection={props.closeWsConnection}/>
            <OrderManage
                users = {props.users}
                //deleteUserByName={props.deleteUserByName}
                //changeUser={props.changeUser}
                setUsers={props.setUsers}
                //addUser={props.addUser}
            />
            {/*<MyFooter/>*/}
        </div>
    );
}

export default OrderManageView;
