import React from "react";
import {Alert, Button, Checkbox, Form, Input, message} from "antd";
import Title from "antd/es/typography/Title";
import {Link, useNavigate} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import * as constant from "../utilities/constant";


function MyLogin(props){
    const navigate = useNavigate();
    function onFinish(values) {
        // values是javascript object, 需要通过json.stringfy转化为json字符串
        console.log(values);
        fetch(`${constant.BACKEND}/user/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            //credentials: 'include',
            body : JSON.stringify(values)
        }).then((res) => {
            if (res.ok) {   // success to get a response
                //console.log(res);
               res.json().then(
                    (json) => {
                        console.log(json.detail);
                        if (json.code === 200) {
                            props.changeProfile(json.detail);
                            navigate("/");
                        }
                        else if (json.code === -300){
                            message.info("Your account had been banned! Please contact admin.");
                        }
                        else if (json.code === 201) {
                            message.info(json.msg);
                            navigate("/bookmanage");
                        }
                        else  message.info("Wrong username or password!");
                    }
                );
            }
            else console.log("Net res error");
        }).catch((error) => {
            console.log("prase error" + error);
        });
    }
    function onFinishFailed(errorInfo) {
        console.log(errorInfo);
    }
    return (
        <div className="login-block">
            <Title >Log in</Title>
        <Form name="basic"
              // labelCol={{span:8}}
              // wrapperCol={{span:8}}
              initialValues={{remember:true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required:true,
                        message: 'Please input your username!'
                    }
                ]}>
                <Input
                    prefix={<UserOutlined/>}
                    placeholder="Username"
                />
            </Form.Item>


            <Form.Item
                label="Password"
                name="userpassword"
                rules={[
                    {
                        required:true,
                        message:'Please input your password!'
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined/>}
                    placeholder="Password"
                />
            </Form.Item>

            {/*<Form.Item>*/}
            {/*    <Form.Item*/}
            {/*        name="remember"*/}
            {/*        valuePropName="checked"*/}
            {/*        noStyle*/}
            {/*    >*/}
            {/*        <Checkbox>Remember me</Checkbox>*/}
            {/*    </Form.Item>*/}

            {/*   <Link to="#" className="login-forgot">Forgot password</Link>*/}
            {/*</Form.Item>*/}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-button">
                    Log in
                </Button>
                Or <Link to="/register">Register now!</Link>
            </Form.Item>

        </Form>

        </div>
    );
}

export default MyLogin;
