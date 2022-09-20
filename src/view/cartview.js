import React from "react";
import UserHead from "../components/head";
import MyFooter from "../components/footer";
import Cart from "../components/cart";

function CartView(props){
    return (
      <div className="cart-view">
          <UserHead profile={props.profile}/>
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
