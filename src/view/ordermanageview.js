
import MyFooter from "../components/footer";
import React from "react";
import UserHead from "../components/head";
import OrderManage from "../components/ordermanage";
import RootHead from "../components/roothead";

function OrderManageView(props){
    return (
        <div className="order-manage-view">
            <RootHead profile={props.profile}/>
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
