import React from "react";
import {Header} from "antd/es/layout/layout";
import {Menu, Select} from "antd";
import {Link} from "react-router-dom";
import {BookOutlined, CarOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import  "../css/base.css";
import Search from "antd/es/input/Search";

class RootHead extends React.Component {
    render() {
        return (
            <Header className="root-header">
                <div className="logo">
                    <Link to="/bookmanage">
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
                    onSearch={this.props.handleSearch}
                />

                <Menu mode="horizontal" className="root-header-menu">
                    <Menu.Item key="1">
                        <Link to="/ordermanage">
                            <CarOutlined/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/statistics">
                            <ShoppingCartOutlined/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/usermanage">
                            <UserOutlined/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/bookmanage">
                           <BookOutlined/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/login">
                            <LogoutOutlined/>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default RootHead;
