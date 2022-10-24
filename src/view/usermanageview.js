
import React from "react";
import UserManage from "../components/usermanage";
import RootHead from "../components/roothead";


function UserManageView(props){
    return (
        <div className="user-manage-view">
            {/*<UserHead/>*/}
            <RootHead profile={props.profile} closeWsConnection={props.closeWsConnection}/>
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
