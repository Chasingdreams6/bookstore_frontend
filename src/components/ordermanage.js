import "../css/ordermanage.css";
import Title from "antd/es/typography/Title";
import React, {useEffect, useState} from 'react';
import {Collapse} from "antd";
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import * as constant from "../utilities/constant";
const { RangePicker } = DatePicker;
const {Panel} = Collapse;


function OrderManage(props) {
    const [allOrdersByTime, setAllOrdersByTime] = useState([]);
    const [startAllOrdersTime, setStartAllOrdersTime] = useState("1970-01-01");
    const [endAllOrdersTime, setEndAllOrdersTime] = useState(moment().format("YYYY-MM-DD"));
    useEffect(
        ()=>{
            fetch(`${constant.BACKEND}/user/getUsers`).then(
                (res)=>{
                    if (res.ok) {
                        res.json().then((json)=>{
                            if (json.code === 200) {
                                console.log(json.detail);
                                props.setUsers(Object.values(json.detail));
                            }
                        })
                    }
                }
            )
        },[]
    )
    useEffect(
        ()=>{
            fetch(`${constant.BACKEND}/allOrdersByTime/?startallorderstime=${startAllOrdersTime}&endallorderstime=${endAllOrdersTime}`)
                .then((res)=>{
                if (res.ok) {
                    res.json().then((json)=>{
                        if (json.code === 200) {
                            console.log(json.detail);
                            setAllOrdersByTime(json.detail);
                        }
                    })
                }
            })
        }, [startAllOrdersTime, endAllOrdersTime]
    )

    const onChangeUser = (key)=> {
        console.log(key);
    }

    let userCnt = props.users.length;
    let allOrders = [];
    for (let i in props.users) { // for all users
        let user = props.users[i];
        let orders = [];
        let priceForUser = 0;
        for (let j in user.orders) { // for all orders
            let order = user.orders[j];
            let items = [];
            let priceForOrder = 0;
            for (let k in order.orderItems) { // for all items
                let item = order.orderItems[k];
                //console.log("item", item);
                let Tex = "isbn:" + item.bookisbn;
                priceForOrder += item.curprice * item.booknumber;
                let cur = (         // every single item
                    <Panel
                        header={Tex}
                        key = {item.id}
                    >
                        <p>price:{item.curprice / 100.0}</p>
                        <p>number:{item.booknumber}</p>
                    </Panel>
                )
                items.push(cur);
            }
            let priceText = "price:" + priceForOrder / 100.0 + "￥";
            let curo = (        // cur order
                <Panel key={order.id} header={priceText}>
                    <Collapse>
                        {items}
                    </Collapse>
                </Panel>
            )
            priceForUser += priceForOrder;
            orders.push(curo);
        }
        let headText = "username:" + user.username + "   " + "consumes: " + priceForUser / 100.0 + "￥";
        let curp = (
            <Panel key={user.id} header={headText}>
               <Collapse>
                   {orders}
               </Collapse>
            </Panel>
        );
        allOrders.push(curp);
    }
    let allOrdersByT = [];
    for (let i in allOrdersByTime) {    // 右半部分
        let order = allOrdersByTime[i];
        let items = [];
        let priceForOrder = 0;
        for (let k in order.orderItems) { // for all items
            let item = order.orderItems[k];
            //console.log("item", item);
            let Tex = "isbn:" + item.bookisbn;
            priceForOrder += item.curprice * item.booknumber;
            let cur = (         // every single item
                <Panel
                    header={Tex}
                    key={item.id}
                >
                    <p>price:{item.curprice / 100.0}</p>
                    <p>number:{item.booknumber}</p>
                </Panel>
            )
            items.push(cur);
        }
        let priceText = "id:" + order.id + " date:" + order.date + " price:" + priceForOrder / 100.0 + "￥";
        let curo = (        // cur order
            <Panel key={order.id} header={priceText}>
                <Collapse>
                    {items}
                </Collapse>
            </Panel>
        )
        allOrdersByT.push(curo);
    }
    const onChangeAllOrdersTime = (value, dateString) => {
        //console.log('Selected Time: ', value);
        console.log('Selected All Orders Time: ', dateString);
        //console.log('cur', moment().format('YYYY-MM-DD'));
        setStartAllOrdersTime(dateString[0]);
        setEndAllOrdersTime(dateString[1]);
    };
    return (
        <div className="order-manage-all-blocks">
            <div className="order-manage-block">
                <Title level={5}>
                    Show All Users and Orders
                </Title>
                <Collapse >
                    {allOrders}
                </Collapse>
            </div>
            <div className="order-manage-orders">
                <Title level={5}>
                    show All orders by Time
                </Title>
                <RangePicker
                    className="order-manage-timepicker"
                    format="YYYY-MM-DD"
                    onChange={onChangeAllOrdersTime}
                />
                <Collapse>
                    {allOrdersByT}
                </Collapse>
            </div>
        </div>
    );
}

export default OrderManage;
