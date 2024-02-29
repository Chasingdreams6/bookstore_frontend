import React from "react";
import {Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {CarOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import Logout from "./logout";

function UserManageHead(props){
    return (
        <Header className="root-header">
            <div className="logo">
                <img
                    src={require("../assets/logo.png")}
                    alt="logo"
                    style={{height: '55px', width:'100px'}}
                />
            </div>

            <Search
                placeholder="input a username or userid"
                allowClear
                enterButton="Search"
                style={{width: 400, padding: 15}}
                onSearch={this.props.search}
            />

            <Menu mode="horizontal" className="root-header-menu">
                <Menu.Item key="1">
                    <Link to="/">
                        <CarOutlined/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="#">
                        <ShoppingCartOutlined/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/profile">
                        <UserOutlined/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Logout profile={props.profile} closeWsConnection={props.closeWsConnection}/>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default UserManageHead;
