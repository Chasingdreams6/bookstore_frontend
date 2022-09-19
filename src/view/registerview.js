import React from "react";
import "../css/registerview.css"
import MyRegister from "../components/register";

function RegisterView(props){
    return (
        <div className="register-view">
            <MyRegister changeProfile={props.changeProfile}/>
        </div>
    );
}

export default RegisterView;
