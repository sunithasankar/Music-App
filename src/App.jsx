import { useState } from 'react';
import './App.css'
import Credits from './components/Credits'
import ThemeChanger from './components/ThemeChanger'
import Player from './components/Player';
import Menu from './components/Menu';
import User from './components/User';
import Playlist from './components/Playlist';

function App() {
  const songsData = [
    {
      id: 1,
      songName: "Natu Natu",
      singers: "Kaala Bhairava & Sipligunj",
      thumbnail: "https://i.ytimg.com/vi/OsU0CGZoV8E/maxresdefault.jpg",
      src: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    },
    {
      id: 2,
      songName: "Samayama",
      singers: "Sid Sriram",
      thumbnail: "https://cdn.telugu360.com/wp-content/uploads/2023/09/maxresdefault-9.jpg",
      src: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    },
    {
      id: 3,
      songName: "DJ Tillu",
      singers: "DJ Tillu",
      thumbnail: "https://m.media-amazon.com/images/M/MV5BYTA0NDI5ZWUtZWMyMy00YjUyLWFkYTYtZDdlMjQ5YmVhNmY0XkEyXkFqcGc@._V1_.jpg",
      src: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    },
    {
      id: 4,
      songName: "Pushpa",
      singers: "DSP",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJtwdI46Fy3Cu_p_2K0mFGaBjg8G1W1fr5RQ&s",
      src: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    }
  ];
  const [songs] = useState(songsData);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songsData[currentSongIndex]);
  const [theme, setTheme] = useState("dark");
  const [popupName, setPopupName] = useState("");

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex + 1 <= songs.length - 1) {
        let nextSongIndex = prevIndex + 1;
        setCurrentSong(songs[nextSongIndex])
        return nextSongIndex;
      }
      return prevIndex;
    });
  }

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => {
      if ((prevIndex - 1) >= 0) {
        let previousSongIndex = prevIndex - 1;
        setCurrentSong(songs[previousSongIndex])
        return previousSongIndex;
      }
      return prevIndex
    });
  }

  const handleSong = (index) => {
    setCurrentSongIndex(index);
    setCurrentSong(songs[index])
    setPopupName("");
  }

  const handleMenu = (option) => {
    if(option==="refresh"){
      window.location.reload();
    } else if(option==="cloud-download"){
      window.open(currentSong.src,"_blank");
    }
    setPopupName(option);
  }

  return (
    <div
      className={`spotify-player-container ${theme}`}>
      <Credits
        songName={currentSong.songName}
        singers={currentSong.singers}
      />
      <ThemeChanger
        theme={theme}
        setTheme={setTheme}
      />
      <Player
        thumbnail={currentSong.thumbnail}
        songSrc={currentSong.src}
        handleNextSong={handleNextSong}
        handlePreviousSong={handlePreviousSong}
      />
      <Menu
        handleMenu={handleMenu}
      />
      {popupName === "user" && <User handleMenu={handleMenu} />}
      {popupName === "list" &&
        <Playlist
          handleMenu={handleMenu}
          songs={songs}
          handleSong={handleSong}
          currentSongIndex={currentSongIndex}
        />}
    </div>
  )
}

export default App
