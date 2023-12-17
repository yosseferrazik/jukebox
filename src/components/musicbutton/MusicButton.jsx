import React, { useState, useEffect } from "react";
import "./MusicButton.css";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";

import { tracks } from "../../tracks";

export const MusicButton = ({
  name,
  img,
  author,
  nowPlaying,
  isPlaying,
  playingId,
  myId,
}) => {
  const [imPlaying, setImPlaying] = useState(false);

  useEffect(() => {
    setImPlaying(isPlaying && myId === playingId);
  }, [isPlaying]);

  //const song = songPath[myId];

  const song = () => {
    const songId = tracks.find((objeto) => objeto.id === myId);
    return songId ? songId.mp3 : "null";
  };

  useEffect(() => {
    let music;

    if (imPlaying) {
      music = new Audio(song());
      console.log(song());
      music.play();
    }

    return () => {
      if (music) {
        music.pause();
        music = null;
      }
    };
  }, [imPlaying, myId]);

  return (
    <button
      className="button"
      onClick={() => {
        nowPlaying();
      }}
    >
      <img src={img} alt="img" />
      <div className="songinfo">
        <p>{name}</p>
        <span id="author">
          <p>{author}</p>
        </span>
      </div>
      <div className="icons">
        <div>{imPlaying ? <RiPauseFill /> : <RiPlayFill />}</div>
      </div>
    </button>
  );
};
