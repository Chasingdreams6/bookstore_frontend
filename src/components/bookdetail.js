import React, {useEffect, useState} from "react";
import "../css/bookdetail.css"
import {Alert, Button, Card, Descriptions, Form, Image, InputNumber, message} from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import * as constant from "../utilities/constant";


function BookDetail(props){
    const [book, setBook] = useState({});
    useEffect(()=> {
        fetch(`${constant.BACKEND}/getBook?bookisbn=${props.isbn}`) // fetch a book
            .then((res) => {
                if (res.ok) {
                    res.json().then((json)=>{
                        if (json.code === 200) {
                            setBook(json.detail);
                            console.log(book);
                        }
                        else {
                            message.info("Request Error");
                        }
                    })
                }
                else console.log("Net error");
            })
            .catch((error)=> {
                console.log("parse error");
            });
    }, []);

    function addToCart(values) {  // send request to backend
        if (props.profile.length < 1) {
            message.info("Please login first!");
            return ;
        }
        if (values.number < 1) {
            message.info("Oops! This book is too hot!");
            return ;
        }
        let request = {
            "isbn":props.isbn,
            "userid":props.profile.id,
            "number":values.number
        };
        //console.log(request);
        fetch(`${constant.BACKEND}/addItem`, {   // additem
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=> {
                    if (json.code === 200) {
                        message.info("Success to add your cart!");
                    }
                    else message.info("Oops! Fail to add to your cart!");
                })
            }
        }).catch((error)=>{console.log("parse error");})
    }
    return (
        <Card className="book-detail">
            <Image
                src={book.bookgraphuri}
                alt={book.bookname}
                className="book-detail-graph"
            />
            <Descriptions
                title="Book Details"
                bordered
                column={2}
                className = "book-detail-info"
            >
                <Descriptions.Item label="Book Name" span={10}>
                    {book.bookname}
                </Descriptions.Item>

                <DescriptionsItem label={"Book ISBN"}>
                    {book.id}
                </DescriptionsItem>

                <Descriptions.Item label={"Book Author"}>
                    {book.bookauthor}
                </Descriptions.Item>

                <DescriptionsItem label={"Book Price"}>
                    {book.bookprice / 100.0}
                </DescriptionsItem>

                <DescriptionsItem label={"Book Remain"} >
                    {book.bookremain}
                </DescriptionsItem>

                <DescriptionsItem label={"Book Information"} >
                    {book.bookinformation}
                </DescriptionsItem>

                <DescriptionsItem label={"Add"}>
                    <Form onFinish={addToCart}>
                        <Form.Item name="number">
                            <InputNumber size="small" min={1} max={book.bookremain}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="book-detail-buy" htmlType="submit"> Add to Cart!</Button>
                        </Form.Item>
                    </Form>

                </DescriptionsItem>
            </Descriptions>

        </Card>
    );
}

export default BookDetail;
