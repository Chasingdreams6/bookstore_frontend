
import React, {useEffect, useState} from "react";
import "../css/cartview.css";
import {Button, List} from "antd";
import Title from "antd/es/typography/Title";
import * as constant from "../utilities/constant";

function Cart(props){
    //console.log(props.bookData);

    useEffect(()=>{
        fetch(`${constant.BACKEND}/getCarts`, {   // get carts
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"userid":props.profile.id})
        }).then((res)=> {
            if (res.ok) {
                res.json().then((json)=>{
                    console.log(json.detail);
                    if (json.detail != null)
                        props.changeCartData(Object.values(json.detail));
                })
            }
            else console.log("Net error");
        }).catch((error)=>{console.log(error);})
    }, [props.flushCart]);

    function renderBuy() {
        //console.log(props.cartData);
        if (props.cartData.length > 0)
        return (
            <Button type="primary" className="cart-buy-all" onClick={props.buyAll}>Buy all!</Button>
        );
    }
    return (
        <div className="cart-container">
            <div className="cart-head">
                <Title level={5} className="cart-title">Cart</Title>
                {renderBuy()}
            </div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    hideOnSinglePage:true,
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={props.cartData}
                renderItem={item => {
                    let book = Object.values(props.bookData).find((ebook, id)=> {
                        return ebook.id === item.bookisbn;
                    })
                    console.log(item);
                    console.log(book);
                    return (
                    <List.Item
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={book.bookgraphuri}
                                //src={require("../assets/" + item.bookGraphUrl)}   local graph
                            />
                        }
                    >

                        <List.Item.Meta
                            title={book.bookname}
                            //description={}
                        />
                        <List.Item.Meta
                            title="ISBN"
                            description={book.id}
                        />
                        <List.Item.Meta
                            title="Price"
                            description={book.bookprice / 100.0}
                        />
                        <List.Item.Meta
                            title="Number"
                            description={item.booknumber}
                        />
                        <div className="cart-opt">
                            <Button
                                type="primary"
                                className="cart-opt-buy"
                                onClick={()=>{
                                    props.buyOneBook(book.id, item.booknumber);
                                }}
                            >Buy it!</Button>
                            <Button
                                className="cart-opt-cancel"
                                onClick={()=>{
                                    props.cancelItem(book.id);
                                }}
                            >Cancel it.</Button>
                        </div>
                    </List.Item>
                );
                }
            }
            />
        </div>
    );
}

export default Cart;
