import React from "react";

import "../css/orderview.css";
import UserHead from "../components/head";
import MyFooter from "../components/footer";
import Order from "../components/order";

function OrderView(props){
    return (
        <div className="order-view">
            <UserHead profile={props.profile}/>
            <Order
                orderData={props.orderData}
                changeOrderData={props.changeOrderData}
                profile={props.profile}
                bookData={props.bookData}

            />
            {/*<MyFooter/>*/}
        </div>
    );
}

export default OrderView;
