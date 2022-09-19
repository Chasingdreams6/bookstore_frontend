import React, {useEffect, useState} from "react";
import "../css/orderview.css";
import {Card, List, message} from "antd";
import Title from "antd/es/typography/Title";
import Meta from "antd/es/card/Meta";
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import Paragraph from "antd/es/typography/Paragraph";
import * as constant from "../utilities/constant";
const { RangePicker } = DatePicker;

function Order(props){

    const [startOrderTime, setStartOrderTime] = useState("1970-01-01");
    const [endOrderTime, setEndOrderTime] = useState(moment().format("YYYY-MM-DD"));
    const [showPicker, setShowPicker] = useState(0);

    useEffect(()=>{ // fetch orders
        fetch(`${constant.BACKEND}/getOrdersByTime`,{
            method: 'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify({
                "userid":props.profile.id,
                "startordertime":startOrderTime,
                "endordertime":endOrderTime
            })
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    if (json.code === 200) {
                        console.log(json.detail);
                        let orders = Object.values(json.detail);
                        props.changeOrderData(orders);
                        setShowPicker(1);
                    }
                    else message.info("Oops! You don't have any orders!");
                })
            }
            else console.log("Net error");
        }).catch((error)=>{console.log(error);})
    },[startOrderTime, endOrderTime]);

    function renderPick() {
        if (showPicker) {
            return (
                <div className="wrapped-order-rangepicker">
                    <Paragraph>
                        Select time
                    </Paragraph>
                    <RangePicker
                        format="YYYY-MM-DD"
                        onChange={onChangeUserOrderTime}
                        className="user-order-rangepicker"
                    />
                </div>
            );
        }
    }
    const onChangeUserOrderTime = (value, dateString) => {
        //console.log('Selected Time: ', value);
        console.log('Selected Book Time: ', dateString);
        //console.log('cur', moment().format('YYYY-MM-DD'));
        setStartOrderTime(dateString[0]);
        setEndOrderTime(dateString[1]);
    };

    const cards = [];
    const curCard = [];
    let total = 0;
    const userInfo = (
        <Card
            type="inner"
            title="UserInfo"
        >
            <Meta title="Username" description={props.profile.username}/>
            <Meta title="Phone" description={props.profile.userphone}/>
            <Meta title="Address" description={props.profile.useraddress}/>
        </Card>
    );
    curCard.push(userInfo);
    props.orderData.forEach((order, key)=> {
        console.log(order);
        const items = order.orderItems;
        items.forEach((item, key)=>{
            let book = Object.values(props.bookData).find((ebook, id)=> {
                return ebook.id === item.bookisbn;
            });
            const totalPrice = item.booknumber * item.curprice / 100.0;
            total = total + totalPrice;

            const cur = (
                <Card
                    type="inner"
                    //title="Goods"
                >
                    <div className="order-good">
                        <img
                            width={233}
                            alt="logo"
                            src={book.bookgraphuri}
                            //src={require("../assets/" + item.bookGraphUrl)}
                        />
                        <div className="order-good-text">
                            <Meta title="Name" description={book.bookname}/>
                            <Meta title="ISBN" description={book.id}/>
                            <Meta title="Author" description={book.bookauthor}/>
                            <Meta title="Number" description={item.booknumber}/>
                            <Meta title="Total Price" description={totalPrice}/>

                        </div>
                    </div>
                </Card>
            );
            curCard.push(cur);
        })

        const show =  "Time" + order.date + "        Total Price " + "   ￥ " + total
        total = 0;
        cards.push((
           <Card title="Order" className="order">
               {
                    curCard.slice()
               }
                <Card title={show}
                    type="inner"
                      headStyle={{float:"right"}}
                 //     style={{float: "inline-end"}}
                />
           </Card>
        ));
        curCard.length = 0; curCard.push(userInfo);
    });
    return (
        <div>
            {renderPick()}
            <div className="order-container">
                {cards}
            </div>
        </div>
    );
}

export default Order;
