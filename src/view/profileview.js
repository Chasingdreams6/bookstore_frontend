import React from "react";

import "../css/profileview.css";
import UserHead from "../components/head";
import MyFooter from "../components/footer";
import Profile from "../components/profile";

function ProfileView(props){
    return (
        <div className="profile-view">
            <UserHead profile={props.profile}/>
            <Profile
                profile={props.profile}
                changeProfile={props.changeProfile}
            />
            <MyFooter/>
        </div>
    );
}

export default ProfileView;
