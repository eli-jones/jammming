import React from "react";
import './searchresults.css';
import TrackList from "../tracklist/tracklist.js";

function SearchResults(props) {
    return (
        <div className="searchresults">
            <h3>Results</h3>
            <TrackList
                userSearchResult={props.userSearchResult}
                isRemoval={true}
                onAdd={props.onAdd}
            />
        </div>
    )
};


export default SearchResults;