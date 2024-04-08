import React, { useEffect, useState } from "react";
import Guts from './images/Guts album.png';
import StickSeason from './images/stick season cover.jpeg';
import Believe from './images/Believe album cover.jpeg';
import IWasIAm from './images/I was album cover.jpg';
import NeverSayNever from './images/never say never album.jpeg';
import './App.css';

const songs = [
  { id: 1, artist: 'Olivia Rodrigo', song: 'all-american bitch', album: 'Guts', duration: '2:45', image: Guts},
  { id: 2, artist: 'Noah Kahan', song: 'Stick Season', album: 'Stick Season', duration: '3:02', image: StickSeason},
  { id: 3, artist: 'Justin Bieber', song: 'Boyfriend', album: 'Believe', duration: '2:51', image: Believe},
  { id: 4, artist: 'Justin Bieber', song: 'Never Say Never', album: 'Never Say Never', duration: '3:47', image: NeverSayNever},
  { id: 5, artist: 'Olivia Rodrigo', song: 'bad idea right?', album: 'Guts', duration: '3:04', image: Guts},
  { id: 6, artist: 'Noah Kahan', song: 'Northern Attitude', album: 'Stick Season', duration: '4:27', image: StickSeason},
  { id: 7, artist: 'Noah Kahan', song: 'All My Love', album: 'Stick Season', duration: '4:11', image: StickSeason},
  { id: 8, artist: 'Justin Bieber', song: 'As Long As You Love me', album: 'Believe', duration: '3:49', image: Believe},
  { id: 9, artist: 'Olivia Rodrigo', song: 'vampire', album:'Guts', duration: '3:39', image: Guts},
  { id: 10, artist: 'Noah Kahan', song: 'She Calls Me Back', album: 'Stick Season', duration: '4:03', image: StickSeason},
  { id: 11, artist: 'Noah Kahan', song: 'Animal', album:'I Was/I Am', duration: '3:39', image: IWasIAm},
  { id: 12, artist: 'Justin Bieber', song: 'Beauty And A Beat', album: 'Believe', duration: '3:47', image: Believe},
  { id: 13, artist: 'Olivia Rodrigo', song: 'get him back!', album:'Guts', duration: '3:31', image: Guts},
  { id: 14, artist: 'Justin Bieber', song: 'Believe', album: 'Believe', duration: '3:42', image: Believe},
  { id: 15, artist: 'Noah Kahan', song: 'Part of Me', album:'I Was/I Am', duration: '3:59', image: IWasIAm},
  { id: 16, artist: 'Justin Bieber', song: 'Somebody To Love', album: 'Never Say Never', duration: '3:40', image: NeverSayNever},
  { id: 17, artist: 'Noah Kahan', song: 'Caves', album:'I Was/I Am', duration: '3:21', image: IWasIAm},
  { id: 18, artist: 'Noah Kahan', song: 'Bad Luck', album:'I Was/I Am', duration: '3:11', image: IWasIAm},
  { id: 19, artist: 'Justin Bieber', song: 'Born To Be Somebody', album: 'Never Say Never', duration: '3:01', image: NeverSayNever},
  { id: 20, artist: 'Olivia Rodrigo', song: 'love is embarrasing', album: 'Guts', duration: '2:34', image: Guts}
];

function App() {
  // state variables
  const [originalLayout, original] = useState(songs);
  const [durationCounter, counter] = useState([]);
  const [album, chosenAlbum] = useState('');
  
  // adds songs to playlist queue
  const addToPlaylist = (item) => {
    if (!durationCounter.some(i => i.id === item.id)) {
      counter([...durationCounter, item]);
    } else {
      removeFromPlaylist(item.id);
    }
  };

  // remove songs from playlist queue
  const removeFromPlaylist = (id) => {
    const updateTimeDuration = durationCounter.filter(item => item.id !== id);
    counter(updateTimeDuration);
  };

  // resets to original layout // state variable settings
  const reset= () => {
    original(songs);
  };

  const filterByArtist = (artist) => {
    const filtered = songs.filter(item => item.artist === artist);
    original(filtered);
  };

  // sorts songs by duration length from songs with the least time to longest
  const sortByDuration = () => {
    const sorted = [...originalLayout].sort((a, b) => {
      const timeA = a.duration.split(':').map(parseFloat);
      const timeB = b.duration.split(':').map(parseFloat);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });
    original(sorted);
  };

  // filter by album
  const filterByAlbum = (album) => {
    const filtered = songs.filter(item => item.album === album);
    original(filtered);
    chosenAlbum(album);
  };

  return (
    <div>

      <div>
        {/* Filter by Artist */}
        <button onClick={reset}>Reset</button>
        <button onClick={sortByDuration}>Sort by Duration</button>
        <button onClick={() => filterByArtist('Olivia Rodrigo')}>Filter by Olivia Rodrigo</button> 
        <button onClick={() => filterByArtist('Noah Kahan')}>Filter by Noah Kahan</button>
        <button onClick={() => filterByArtist('Justin Bieber')}>Filter by Justin Bieber</button>

        {/* Filter by Album */}
        <button onClick={() => filterByAlbum('Guts')}>Filter by Guts Album</button>
        <button onClick={() => filterByAlbum('Stick Season')}>Filter by Stick Season Album</button>
        <button onClick={() => filterByAlbum('Believe')}>Filter by Believe Album</button>
        <button onClick={() => filterByAlbum('Never Say Never')}>Filter by Never Say Never Album</button>
        <button onClick={() => filterByAlbum('I Was/I Am')}>Filter by I Was/I Am Album</button>
      </div>

      {/* Playlist */}
      <div>
        <h2>Playlist</h2>
        <p>Total Duration: {
          durationCounter.reduce((acc, curr) => {
            const time = curr.duration.split(':').map(parseFloat);
            return acc + time[0] * 60 + time[1];
          }, 0)
        } seconds</p>
        {durationCounter.map(item => (
          <div key={item.id}>
            <p>{item.song}</p>
          </div>
        ))}
      </div>

      {/* List of Songs */}
      <div className="music-list">
        <h2>My Music</h2>
        {originalLayout.map(item => (
          <div className="song-card" key={item.id}>
            <img src={item.image} alt={item.song} />

            {/* Information displayed on the cards */}
            <div>
              <p>{item.song}</p>
              <p>by {item.artist}</p>
              <p>{item.duration}</p>
            </div>

            {/* Add/Remove to Playlist Button */}
            <button className="add-remove-button" onClick={() => addToPlaylist(item)}>
              {durationCounter.some(i => i.id === item.id) ? 'Remove from Playlist' : 'Add to Playlist'}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;