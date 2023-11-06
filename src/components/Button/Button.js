import React, { useState, useEffect } from "react";
import "./Button.css";
import pride from "./songs/pride.mp3";
import afterdark from "./songs/after-dark.mp3";
import saveyourtears from "./songs/save-your-tears.mp3";
import lovelybastards from "./songs/lovely-bastards.mp3";
import spitinmyface from "./songs/spit-in-my-face.mp3";
import whoisshe from "./songs/who-is-she.mp3";
import { FaPlay, FaPause } from "react-icons/fa";

export default function Button({
  name,
  img,
  author,
  nowPlaying,
  isPlaying,
  id2,
  myid,
}) {
  const [yo, setYo] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isPlaying) {
      if (myid === id2) {
        setYo(true);
      } else {
        setYo(false);
      }
    } else {
      setYo(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);
  function pathFinder(id) {
    switch (id) {
      case 1:
        return saveyourtears;
      case 2:
        return afterdark;
      case 3:
        return lovelybastards;
      case 4:
        return spitinmyface;
      case 5:
        return pride;
      case 6:
        return whoisshe;
      default:
        break;
    }
  }

  useEffect(() => {
    let music;

    if (yo) {
      music = new Audio(pathFinder(myid));
      music.play();
    } else if (music) {
      music.pause();
    }

    return () => {
      if (music) {
        music.pause();
        music = null;
      }
    };
  }, [yo, myid]);

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
        <span>
          <p>{author}</p>
        </span>
      </div>
      <div>{yo ? <FaPause /> : <FaPlay />}</div>
    </button>
  );
}
