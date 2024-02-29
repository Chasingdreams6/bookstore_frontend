import React from "react";
import {Layout} from "antd";
import MyFooter from "../components/footer";
import BookContent from "../components/bookcontent";
import UserHeadSearch from "../components/userhead_search";


function BookView(props){
    return (
      <Layout>
            <UserHeadSearch
                handleSearch={props.handleSearch}
                profile={props.profile}
                closeWsConnection={props.closeWsConnection}
            />
            <BookContent
                bookData={props.bookData}
                searchByPrice={props.searchByPrice}
                searchByClass={props.searchByClass}
                toggleSearchPrice={props.toggleSearchPrice}
            />
            <MyFooter/>
      </Layout>
    );
}

export default BookView;
