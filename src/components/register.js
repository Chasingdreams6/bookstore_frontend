import React from "react";
import {Button, Form, Input, message, Select} from "antd";
import {Option} from "antd/es/mentions";
import "../css/registerview.css"
import Title from "antd/es/typography/Title";
import {useNavigate} from "react-router-dom";
import * as constant from "../utilities/constant";


function MyRegister(props){
    const navigate = useNavigate();
    function onFinish(values) {
        console.log('Recieved', values);
        const formattedData = {
            "username":values.username,
            "userpassword":values.password,
            "usergender":values.gender,
            "usermail":values.email,
            "userphone":values.phone,
            "useraddress":values.address,
        };
        let userID;
        fetch(`${constant.BACKEND}/user/register`, {    // 创建一个用户
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.detail);
                    if (json.code === 200) {
                        message.info("Success to Register");
                        props.changeProfile(json.detail); // load userdata
                        userID = json.detail.id;
                        fetch(`${constant.BACKEND}/createCart?userid=${userID}`).then((res) => {
                                console.log("after create")
                                if (res.ok) {
                                    res.json().then((json)=> {
                                        //console.log(json.detail);
                                        if (json.code === 200) {
                                            message.info("Success to create a Cart");
                                            navigate("/login");
                                        }
                                    })
                                }
                            }
                        )
                    }
                    else {
                        message.info("The username has been used!");
                    }
                })
            }
        })
    }
    return (
        <div className="register-block">
            <Title>Register</Title>
            <Form
                name="register"
                onFinish={onFinish}
                >
                <Form.Item
                    name="email"
                    label="E-email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input your email!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                    >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required:true,
                            message:'Please input your username!'
                        },
                        {
                            type: "string",
                            message :"The input is invalid!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message:'Please input your password!'
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required:true,
                            message:'Please confirm your password!'
                        },
                        ({getFieldValue})=>({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords differ!'));
                            }
                        })
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required:true,
                            message:'Please input your phone number!'
                        },
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required:true,
                            message:'Please select your gender!'
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Select placeholder="select your gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required:true,
                            message:'Please input your address!'
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-button">Register</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default MyRegister;
