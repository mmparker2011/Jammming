import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Play List',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  savePlaylist() {
    let trackURIs = [];
    this.Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        searchResults: []
      });
    });
  }

  addTrack(track) {
    console.log("in add track");
    let newPlaylist = this.state.playlistTracks;
    console.log(newPlaylist);
    let inPlaylist = newPlaylist.includes(track);
    if(!inPlaylist){
      newPlaylist.push(track);
      this.setState({
        playlistTracks: newPlaylist
      });
    } else {
      alert("This track already exists in the playlist!");
    }
  }

  removeTrack(track) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id)
      });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
          onSearch={this.search}
          />
          <div classNames="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <PlayList
              playlistName={this.state.playListName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
