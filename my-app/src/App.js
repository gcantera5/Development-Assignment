import React, { useEffect, useState } from "react";
import Guts from './images/Guts album.png';
import StickSeason from './images/stick season cover.jpeg';
import Believe from './images/Believe album cover.jpeg';
import './App.css';

const musicData = [
  { id: 1, artist: 'Olivia Rodrigo', song: 'all-american bitch', duration: '2:45', image: Guts},
  { id: 2, artist: 'Noah Kahan', song: 'Stick Season', duration: '3:02', image: StickSeason},
  { id: 3, artist: 'Justin Bieber', song: 'Boyfriend', duration: '2:51', image: Believe},
  { id: 4, artist: 'Olivia Rodrigo', song: 'bad idea right?', duration: '3:04', image: Guts},
  { id: 5, artist: 'Noah Kahan', song: 'Northern Attitude', duration: '4:27', image: StickSeason},
  { id: 6, artist: 'Noah Kahan', song: 'All My Love', duration: '4:11', image: StickSeason},
  { id: 7, artist: 'Justin Bieber', song: 'As Long As You Love me', duration: '3:49', image: Believe},
  { id: 8, artist: 'Olivia Rodrigo', song: 'vampire', duration: '3:39', image: Guts},
  { id: 9, artist: 'Noah Kahan', song: 'She Calls Me Back', duration: '4:03', image: StickSeason},
  { id: 10, artist: 'Justin Bieber', song: 'Beauty And A Beat', duration: '3:47', image: Believe},
  { id: 11, artist: 'Olivia Rodrigo', song: 'all-american bitch', duration: '2:45', image: Guts},
  { id: 12, artist: 'Justin Bieber', song: 'Believe', duration: '3:42', image: Believe}
];

function App() {
  const [filteredMusic, setFilteredMusic] = useState(musicData);
  const [aggregator, setAggregator] = useState([]);
  
  const addToAggregator = (item) => {
    if (!aggregator.some(i => i.id === item.id)) {
      setAggregator([...aggregator, item]);
    } else {
      removeFromAggregator(item.id);
    }
  };

  const removeFromAggregator = (id) => {
    const updatedAggregator = aggregator.filter(item => item.id !== id);
    setAggregator(updatedAggregator);
  };

  const resetFilters = () => {
    setFilteredMusic(musicData);
  };

  const filterByArtist = (artist) => {
    const filtered = musicData.filter(item => item.artist === artist);
    setFilteredMusic(filtered);
  };

  const sortByDuration = () => {
    const sorted = [...filteredMusic].sort((a, b) => {
      const timeA = a.duration.split(':').map(parseFloat);
      const timeB = b.duration.split(':').map(parseFloat);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });
    setFilteredMusic(sorted);
  };

  return (
    <div>
      <div>
        <button onClick={resetFilters}>Reset</button>
        <button onClick={sortByDuration}>Sort by Duration</button>
        <button onClick={() => filterByArtist('Olivia Rodrigo')}>Filter by Olivia Rodrigo</button>
        <button onClick={() => filterByArtist('Justin Bieber')}>Filter by Justin Bieber</button>
        <button onClick={() => filterByArtist('Noah Kahan')}>Filter by Noah Kahan</button>
        {/* Add more filter buttons as needed */}
      </div>
      <div>
        <h2>Playlist</h2>
        <p>Total Duration: {
          aggregator.reduce((acc, curr) => {
            const time = curr.duration.split(':').map(parseFloat);
            return acc + time[0] * 60 + time[1];
          }, 0)
        } seconds</p>
        {aggregator.map(item => (
          <div key={item.id}>
            <img src={item.image} alt={item.song} />
            <p>{item.song}</p>
            <button onClick={() => removeFromAggregator(item.id)}>Remove from Aggregator</button>
          </div>
        ))}
      </div>
      <div className="music-list">
        <h2>My Music</h2>
        {filteredMusic.map(item => (
          <div className="music-card" key={item.id}>
            <img src={item.image || 'placeholder.jpg'} alt={item.song} />
            <div>
              <p>{item.song}</p>
              <p>by {item.artist}</p>
              <p>Duration: {item.duration}</p>
            </div>
            <button onClick={() => addToAggregator(item)}>
              {aggregator.some(i => i.id === item.id) ? 'Remove from Aggregator' : 'Add to Aggregator'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
