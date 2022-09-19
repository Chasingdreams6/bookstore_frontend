
import React from "react";
import {Header} from "antd/es/layout/layout";
import {Menu} from "antd";
import {CarOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import "../css/base.css"
import {Link} from "react-router-dom";
import Search from "antd/es/input/Search";


function UserHeadSearch(props){
    return (
        <Header className="user-header">
            <div className="logo">
                <Link to="/">
                    <img
                        src={require("../assets/logo.png")}
                        alt="logo"
                        style={{height: '55px', width:'100px'}}
                    />
                </Link>
            </div>

            <Search
                placeholder="input a ISBN or a Book's Name"
                allowClear
                enterButton="Search"
                style={{width: 400, padding: 15}}
                onSearch={props.handleSearch}
            />

            <Menu mode="horizontal" className="user-header-menu">
                <Menu.Item key="1">
                    <Link to="/order">
                        <CarOutlined/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/cart">
                        <ShoppingCartOutlined/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/profile">
                        <UserOutlined/>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/login">
                        <LogoutOutlined/>
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default UserHeadSearch;
