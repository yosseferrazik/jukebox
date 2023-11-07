import React, { useState, useEffect } from "react";
import "./Screen.css";
import Button from "../Button/Button";
import { tracks } from "../Button/songs/track";

export const Screen = ({ pasarId }) => {
  const [playing, setPlaying] = useState(false);
  const [actual, setActual] = useState(" ");
  const [id, setId] = useState(0);
  const [title, setTitle] = useState(" ");
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTitle(playing ? actual : "");
    pasarId(playing ? id : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <>
      <div className="screen">
        <div className="text">
          <p>Ahora reproduciendo</p>
        </div>
        <div className="playing">
          <h1>{title}</h1>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="table">
        {tracks.map((music) => {
          const nowPlaying = () => {
            setPlaying(playing ? false : true);
            setActual(music.title);
            setId(playing ? 0 : music.id);
          };

          return (
            <Button
              isPlaying={playing}
              nowPlaying={nowPlaying}
              author={music.author}
              name={music.title}
              img={music.src}
              key={music.id}
              id2={id}
              myid={music.id}
            />
          );
        })}
      </div>
    </>
  );
};
