
import MyFooter from "../components/footer";
import React from "react";
import UserHead from "../components/head";
import UserManage from "../components/usermanage";
import RootHead from "../components/roothead";


function UserManageView(props){
    return (
        <div className="user-manage-view">
            {/*<UserHead/>*/}
            <RootHead/>
            <UserManage
                users = {props.users}
                deleteUserByName={props.deleteUserByName}
                changeUser={props.changeUser}
                setUsers={props.setUsers}
                //addUser={props.addUser}
            />
        </div>
    );
}

export default UserManageView;
