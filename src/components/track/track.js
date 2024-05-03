import React from "react";
import './track.css';

function Track(props) {
    function renderAction() {
        if(props.isRemoval) {
            return <button className="track-action" onClick={passTrack} >+</button>  
        } else {
              return <button className="track-action" onClick={passTrackToRemove} >-</button>
        }
    };
    
    function passTrack() {
        props.onAdd(props.track);
    };
    
    function passTrackToRemove() {
        props.onRemove(props.track);
    };
    
    return (
        <div className="track">
            <div className="track-info">
                <h4>{props.track.name}</h4>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
        {renderAction()}
        </div>
    )
};


export default Track;