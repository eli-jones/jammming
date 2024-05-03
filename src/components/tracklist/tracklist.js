import React from "react";
import './tracklist.css';
import Track from "../track/track.js";

function TrackList(props) {
    return (
        <div className="tracklist">
            {props.userSearchResult.map((track) => (
                <Track
                    track={track}
                    key={track.id}
                    isRemoval={props.isRemoval}
                    onAdd={props.onAdd}
                    onRemove={props.onRemove}
                />
            ))}
        </div>
    )
};


export default TrackList;