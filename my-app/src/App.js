import React, { useEffect, useState } from "react";
import './App.css';

const musicData = [
  { id: 1, artist: 'Olivia Rodgrigo', song: 'all-american bitch', duration: '2:45', image: 'my-app/src/images/Guts album.png' },
  { id: 2, artist: 'Artist 2', song: 'Song 2', duration: 240, image: 'image2.jpg' },
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
        {/* Add more filter buttons as needed */}
      </div>
      <div>
        <h2>Aggregator</h2>
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
        <h2>Music List</h2>
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
