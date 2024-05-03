import React, {useState} from "react";
import './searchbar.css';

function SearchBar(props) {
    const [term, setTerm] = useState("");
    
    function passTerm() {
        props.onSearch(term);
    };
    
    function handleTermChange({target}) {
        setTerm(target.value);
    };
          
    return (
        <div className="searchbar">
            <input
                type="text"
                name="searchBar"
                placeholder="Search"
                onChange={handleTermChange}
            />
            <button type="submit" name="searchBar" onClick={passTerm} >Search</button>
        </div>
    )
};


export default SearchBar;