import UserHeadSearch from "../components/userhead_search";
import React from "react";
import FullTextSearch from "../components/fullTextSearch";
import FullTextSearchResult from "../components/FullTextSearchResult";

function FullTextSearchView(props) {
    return (
        <div className="fullText-View">
           <FullTextSearch
                profile = {props.profile}
                closeWsConnection={props.closeWsConnection}
                handleFullTextSearch={props.handleFullTextSearch}
           />
            <FullTextSearchResult
                bookList={props.bookList}
            />
        </div>
    )
}

export default FullTextSearchView;
