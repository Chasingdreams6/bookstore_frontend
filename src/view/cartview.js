import React from "react";
import UserHead from "../components/head";
import Cart from "../components/cart";

function CartView(props){
    return (
      <div className="cart-view">
          <UserHead profile={props.profile} closeWsConnection={props.closeWsConnection}/>
          <Cart
              cartData={props.cartData}
              bookData={props.bookData}
              profile={props.profile}
              changeCartData={props.changeCartData}
              buyOneBook={props.buyOneBook}
              buyAll={props.buyAll}
              cancelItem={props.cancelItem}
              flushCart={props.flushCart}
          />
          {/*<MyFooter/>*/}
      </div>
    );
}

export default CartView;
