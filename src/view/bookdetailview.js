import React from "react";
import UserHead from "../components/head";
import MyFooter from "../components/footer";
import BookDetail from "../components/bookdetail";
import {useParams} from "react-router-dom";

function BookDetailView(props) {
        return (
            <div className="bookdetail-view">
                <UserHead profile={props.profile} closeWsConnection={props.closeWsConnection}/>
                <BookDetail isbn={useParams().id} profile={props.profile}/>
                <MyFooter/>
            </div>
        );
}

export default BookDetailView;
