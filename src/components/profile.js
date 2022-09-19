import React, {useState} from "react";
import {Button, Form, Image, Input, message, Select, Typography} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import * as constant from "../utilities/constant";

function Profile(props){

    function onFinish(values) {   // try to update information
        values.userid = props.profile.id;
        const formattedData = {
            "userid":props.profile.id,
            "username":values.username,
            "userpassword":values.userPassword,
            "usergender":values.userGender,
            "usermail":values.userEmail,
            "userphone":values.userPhone,
            "useraddress":values.userAddress,
            "uservalid":props.profile.valid
        };
        console.log(formattedData);
        fetch(`${constant.BACKEND}/user/updateUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formattedData)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    if (json.code === 200) {
                        message.info("Success to Update");
                        props.changeProfile(values);
                    }
                    else message.info("Opps! Network error");
                })
            }
            else message.info("Net error");
        }).catch((error)=>{console.log(error);})
    }
    function renderProfile() {
        if (props.profile.id !== undefined)
        return (
            <Form
                name="Profile"
                onFinish={onFinish}
            >
                <Form.Item
                    name="userEmail"
                    label="E-email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input your new email!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                    initialValue={props.profile.usermail}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required:true,
                            message:'Please input your new username!'
                        },
                        {
                            type: "string",
                            message :"The input is invalid!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                    initialValue={props.profile.username}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="userPassword"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message:'Please input your new password!'
                        }
                    ]}
                    labelCol={{span:'8'}}
                    initialValue={props.profile.userpassword}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['userPassword']}
                    hasFeedback
                    rules={[
                        {
                            required:true,
                            message:'Please confirm your new password!'
                        },
                        ({getFieldValue})=>({
                            validator(_, value) {
                                if (!value || getFieldValue('userPassword') === value) {
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
                    name="userPhone"
                    label="Phone Number"
                    rules={[
                        {
                            required:true,
                            message:'Please input your new phone number!'
                        },
                    ]}
                    labelCol={{span:'8'}}
                    initialValue={props.profile.userphone}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="userGender"
                    label="Gender"
                    rules={[
                        {
                            required:true,
                            message:'Please select your gender!'
                        }
                    ]}
                    labelCol={{span:'8'}}
                    initialValue={props.profile.usergender}
                >
                    <Select placeholder="select your gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="userAddress"
                    label="Address"
                    rules={[
                        {
                            required:true,
                            message:'Please input your new address!'
                        }
                    ]}
                    labelCol={{span:'8'}}
                    initialValue={props.profile.useraddress}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-button">Update</Button>
                </Form.Item>
            </Form>
        );
        else message.info("please login first");
    }
    return (
        <div className="profile-block">
            <Title>Profile</Title>
            {renderProfile()}
        </div>
    );
}

export default Profile;
