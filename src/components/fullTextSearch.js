import {Link} from "react-router-dom";
import Search from "antd/es/input/Search";
import {Menu} from "antd";
import {CarOutlined, ShoppingCartOutlined, UserOutlined, ZoomOutOutlined} from "@ant-design/icons";
import Logout from "./logout";
import {Header} from "antd/es/layout/layout";
import React from "react";

function FullTextSearch(props) {
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
                placeholder="input book information"
                allowClear
                enterButton="Search"
                style={{width: 400, padding: 15}}
                onSearch={props.handleFullTextSearch}
            />

            <Menu mode="horizontal" className="user-header-menu">
                <Menu.Item key="5">
                    <Link to="/fullTextSearch">
                        <ZoomOutOutlined/>
                    </Link>
                </Menu.Item>
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
                    <Logout profile={props.profile} closeWsConnection={props.closeWsConnection}/>
                </Menu.Item>
            </Menu>
        </Header>
    );
}
export default FullTextSearch;
