import React from "react";
import './playlist.css';
import TrackList from "../tracklist/tracklist.js";

function PlayList(props) {
    function handleNameChange({target}) {
        props.onNameChange(target.value);
    };
    
    return (
        <div className="playlist">
            <input
                defaultValue="New Playlist"
                className="plvalue"
                onChange={handleNameChange}
            />
            <div className="list-holder">
                <TrackList
                    userSearchResult={props.playlistTracks}
                    isRemoval={false}
                    onRemove={props.onRemove}
                />
            </div>
            <button className="save" onClick={props.onSave} >Save to Spotify</button>
        </div>
        )
    };


export default PlayList;