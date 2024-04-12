import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { Spotify } from "../../util/Spotify";

function App() {
  // Define initial state for search results using useState
  const [searchResults, setSearchResults] = useState([
    {
      name: "name1",
      artist: "artist1",
      album: "album1",
      id: 1,
    },
    {
      name: "name2",
      artist: "artist2",
      album: "album2",
      id: 2,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Artist Name 1",
      album: "Example Album Name 1",
      id: 1,
    },
    {
      name: "Example Playlist Name 1",
      artist: "Example Artist Name 1",
      album: "Example Album Name 1",
      id: 2,
    },
    {
      name: "Example Playlist Name 1",
      artist: "Example Artist Name 1",
      album: "Example Album Name 1",
      id: 3,
    },
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className={styles["App-playlist"]}>
          {/* this is inside [''] and no . after "styles", because has "-" in name */}
          {/* <!-- Pass searchResults state as props to SearchResults component --> */}
          <SearchResults searchResults={searchResults} onAdd={<addTrack />} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
