import React from "react";

import "../css/bookmanage.css";
import BookManage from "../components/bookmanage";
import MyFooter from "../components/footer";
import RootHead from "../components/roothead";

function BookManageView(props){
    return (
        <div className="book-manage-view">
            <RootHead handleSearch = {props.handleSearch} profile = {props.profile}/>
            <BookManage
                bookData = {props.bookData}
                changeBook = {props.changeBook}
                deleteBookByISBN = {props.deleteBookByISBN}
            />
        </div>
    );
}

export default BookManageView;
