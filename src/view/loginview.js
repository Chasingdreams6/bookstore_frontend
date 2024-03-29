import React from "react";
import "../css/loginview.css";
import MyLogin from "../components/login";

function LoginView(props){
    return (
        <div className="login-view">
            <MyLogin changeProfile={props.changeProfile}
                     changeCartData={props.changeCartData}
                     getWebSocketConnection={props.getWebSocketConnection}
            />
        </div>
    );
}

export default LoginView;
