import React, {useState} from "react";
import styles from './App.css';
import PlayList from "../playlist/playlist.js";
import SearchBar from "../searchbar/searchbar.js";
import SearchResults from "../searchresults/searchresults.js";
import {Spotify} from "../../util/spotify.js";


function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: 'example name 1',
      artist: 'example artist 1',
      album: 'example album 1',
      id: 1
  }, {
      name: 'example name 2',
      artist: 'example artist 2',
      album: 'example album 2',
      id: 2
     }
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
      {
      name: 'example playlist 1',
      artist: 'example pl artist 1',
      album: 'example pl album 1',
      id: 3
     }, {
      name: 'example playlist 2',
      artist: 'example pl artist 2',
      album: 'example pl album 2',
      id: 4
     }
      
  ]);
  
  function addTrack(track) {
      const existingTrack = playlistTracks.find(t => t.id === track.id);
      const newTrack = playlistTracks.concat(track);
      if (existingTrack) {
          console.log("Track already exists");
      } else {
          setPlaylistTracks(newTrack);
      }
  };
    
  function removeTrack(track) {
      const existingTrack= playlistTracks.filter((t) => t.id !== track.id);
      setPlaylistTracks(existingTrack);
  };
    
  function updatePlaylistName(name) {
      setPlaylistName(name);
  };
    
  function savePlaylist() {
      const trackURIs = playlistTracks.map((t) => t.uri);
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
          setPlaylistName('New Playlist');
          setPlaylistTracks([]);
      });
  };
    
  function search(term) {
      Spotify.search(term).then(result => setSearchResults(result));
      console.log(term);
  };
    
  return (
        <div className={styles.app}>
            <SearchBar
                onSearch={search}
            />
            <div className={styles.appPlaylist}>
                <SearchResults
                    userSearchResult={searchResults}
                    onAdd={addTrack}
                />
                <PlayList
                    playlistName={playlistName}
                    playlistTracks={playlistTracks}
                    onRemove={removeTrack}
                    onNameChange={updatePlaylistName}
                    onSave={savePlaylist}
                />        
            </div>
        </div> 
 )};

export default App;
