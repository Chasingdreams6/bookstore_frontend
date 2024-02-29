import {LogoutOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {message} from "antd";
import * as constant from "../utilities/constant";


function Logout(props) {
    function logout() {
        let values = {
            'username' : props.profile.username
        }
        if (props.profile.username !== undefined) {
            console.log("send logout");
            console.log("user:", props.profile.username);
            fetch(`${constant.BACKEND}/user/logout`,{
                method: 'POST',
                credentials : 'include',
                mode : 'cors',
                headers:{
                    'Content-Type': 'application/json',
                },
                //credentials: 'include',
                body : JSON.stringify(values)
            }).then((res)=>{
                if (res.ok) {
                    props.closeWsConnection();
                    res.json().then((json)=>{
                        console.log(json.detail);
                        message.info(json.detail);
                    })
                }
                else console.log("Net res error");
            }).catch((error) => {
                console.log("prase error" + error);
            });
        }

    }
    return (
        <Link to="/login" onClick={logout}>
            <LogoutOutlined/>
        </Link>
    );
}

export default Logout;
