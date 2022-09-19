import React from "react"
import "../css/addbook.css"
import Title from "antd/es/typography/Title";
import {Button, Form, Input, InputNumber, message} from "antd";
import * as constant from "../utilities/constant";

function AddBook(props) {
    function onFinish(values) {
        console.log(values);
        const req = {
            "id":values.bookisbn,
            "bookname":values.bookname,
            "bookprice":values.bookprice,
            "bookauthor":values.bookauthor,
            "bookinformation":values.bookinformation,
            "bookremain":values.bookremain,
            "bookgraphuri":values.bookgraphuri
        }
        fetch(`${constant.BACKEND}/addBook`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    message.info(json.msg);
                })
            }
        })
    }
    return (
        <div className="add-book-block">
            <Title className="add-book-title">Add a Book</Title>
            <Form
                name="addbook"
                onFinish={onFinish}
                >
                <Form.Item
                    name="bookisbn"
                    label="bookisbn"
                    rules={[
                        {
                            type: "string",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input book isbn!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="bookname"
                    label="bookname"
                    rules={[
                        {
                            type: "string",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input book name!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="bookauthor"
                    label="bookauthor"
                    rules={[
                        {
                            type: "string",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input book author!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="bookprice"
                    label="bookprice(multiply by 100)"
                    rules={[
                        // {
                        //     type: "string",
                        //     message: "The input is invalid!"
                        // },
                        {
                            required: true,
                            message: "Please input book price!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <InputNumber min={1}  />
                </Form.Item>
                <Form.Item
                    name="bookremain"
                    label="bookremain"
                    rules={[
                        // {
                        //     type: "string",
                        //     message: "The input is invalid!"
                        // },
                        {
                            required: true,
                            message: "Please input book remain!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <InputNumber min={1}  />
                </Form.Item>
                <Form.Item
                    name="bookinformation"
                    label="bookinformation"
                    rules={[
                        {
                            type: "string",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input book information!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="bookgraphuri"
                    label="bookgraphuri"
                    rules={[
                        {
                            type: "url",
                            message: "The input is invalid!"
                        },
                        {
                            required: true,
                            message: "Please input bookgraphuri!"
                        }
                    ]}
                    labelCol={{span:'8'}}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="add-book-button">Add Book</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddBook;
