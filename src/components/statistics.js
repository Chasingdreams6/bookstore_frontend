import "../css/statisticsview.css"
import {Card, List, message, Typography} from "antd";
import {useEffect, useState} from "react";
import Title from "antd/es/typography/Title";
import Cart from "./cart";
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import * as constant from "../utilities/constant";
const { RangePicker } = DatePicker;

function Statistics(props) {
    const [mostCostUser, setMostCostUser] = useState({
        username:"fetching..."
    });
    const [popularBooks, setPopularBooks] = useState([]);
    const [usersByCost, setUsersByCost] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [startUserTime, setStartUserTime] = useState("1970-01-01");
    const [endUserTime, setEndUserTime] = useState(moment().format("YYYY-MM-DD"));
    const [startBookTime, setStartBookTime] = useState("1970-01-01");
    const [endBookTime, setEndBookTime] = useState(moment().format("YYYY-MM-DD"));
    useEffect(
        ()=>{
            fetch(`${constant.BACKEND}/user/usersSortedByCost?startusertime=${startUserTime}&endusertime=${endUserTime}`)
                .then((res)=>{
                if (res.ok) {
                    res.json().then((json)=>{
                        if (json.code === 200) {
                            //console.log("costUser", json.detail);
                            console.log(json.detail);
                            setUsersByCost(json.detail);
                            //setMostCostUser(json.detail);
                            //calculate();
                        }
                    })
                }
            }).catch((error)=>{message.info(error)})

            fetch(`${constant.BACKEND}/popularBooks/?startbooktime=${startBookTime}&endbooktime=${endBookTime}`)
                .then((res)=>{
                if (res.ok) {
                    res.json().then((json)=>{
                        if (json.code === 200) {
                            console.log(json.detail);
                            setPopularBooks(json.detail);
                        }
                    })
                }
            }).catch((error)=>{message.info(error)})
        }, [startUserTime, endUserTime, startBookTime, endBookTime]
    )

    function calculate() {
        let cost = 0;
        for (let i in mostCostUser.orders) {
            let order = mostCostUser.orders[i];
            for (let j in order.orderItems) {
                let item = order.orderItems[j];
                cost += item.curprice * item.booknumber;
            }
        }
        //console.log(cost);
        setTotalCost(cost);
    }

    const onFinishedMostCostUserTime = (value) => {
        console.log(value);
    }

    const onChangeMostCostUserTime = (value, dateString) => {
        //console.log('Selected Time: ', value);
        console.log('Selected User Time: ', dateString);
        //console.log('cur', moment().format('YYYY-MM-DD'));
        setStartUserTime(dateString[0]);
        setEndUserTime(dateString[1]);
    };
    const onFinishedMostCostBookTime = (value) => {
        console.log(value);
    }

    const onChangeMostCostBookTime = (value, dateString) => {
        //console.log('Selected Time: ', value);
        console.log('Selected Book Time: ', dateString);
        //console.log('cur', moment().format('YYYY-MM-DD'));
        setStartBookTime(dateString[0]);
        setEndBookTime(dateString[1]);
    };

    return (
        <div>
            <Title level={5} className="statistics-header">Statistics</Title>
            <div className="statistics-cards">
                <div className="statistics-most-cost-user">
                    <RangePicker
                        format="YYYY-MM-DD"
                        onOk={onFinishedMostCostUserTime}
                        onChange={onChangeMostCostUserTime}
                    />
                    <List
                        className="statistics-most-cost"
                        header={<div>Most Cost Users</div>}
                        dataSource={usersByCost}
                        renderItem={(item)=>(
                            <List.Item>
                                <p>name:{item.name}</p>
                                <p>cost:{item.cost / 100.0}</p>
                            </List.Item>
                        )}
                    />
                </div>
                <div  className="statistics-most-cost-book">
                    <RangePicker
                        format="YYYY-MM-DD"
                        onOk={onFinishedMostCostBookTime}
                        onChange={onChangeMostCostBookTime}
                    />
                    <List

                        header={<div>Popular Books</div>}
                        dataSource={popularBooks}
                        renderItem={(item)=>(
                            <List.Item>
                                <p>isbn:{item.isbn}</p>
                                <p>number:{item.number}</p>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>

    );
}

export default Statistics;
