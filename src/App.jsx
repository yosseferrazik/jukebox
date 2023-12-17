import React, { useState, useEffect } from "react";
import { tracks } from "./tracks";
import "./App.css";
import { MusicButton } from "./components/musicbutton/MusicButton";
import {
  RiSearch2Line,
  RiHashtag,
  RiTimeLine,
  RiUser3Line,
  RiSortAsc,
  RiSortDesc,
} from "react-icons/ri";

export const App = () => {
  const [playing, setPlaying] = useState(false);
  const [actual, setActual] = useState([]);
  const [id, setId] = useState(0);
  const [search, setSearch] = useState("");
  const [commonTag, setcommonTag] = useState([]);
  const [track, settrack] = useState(tracks);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState("name");
  const vynil =
    "https://static.vecteezy.com/system/resources/previews/001/206/675/original/rock-music-icon-vinyl-record-png.png";
  const [image, setImage] = useState(vynil);

  const default_bgcolor = "#242424";
  const bgcolor = playing ? actual.color : false || default_bgcolor;

  useEffect(() => {
    randomTags();
    console.log(track);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = bgcolor;
    // playing ? console.log(actual) : false;
    // console.log(tags);
  }, [playing]);

  let tags = tracks.reduce((tags, object) => {
    return tags.concat(object.title, object.tags);
  }, []);

  const palabras = [
    "Hollow Knight",
    "Indie",
    "Electro swing",
    "Rock",
    "Minecraft",
    "Hip hop",
    "Punk",
    "Phonk",
  ];

  const randomTags = () => {
    const palabrasClon = [...palabras];

    const commonTags = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * palabrasClon.length);
      commonTags.push(palabrasClon.splice(randomIndex, 1)[0]);
    }
    setcommonTag(commonTags);
  };

  const filteredTracks = track
    .filter((track) =>
      track.tags
        .map((tag) => (typeof tag === "string" ? tag.toLowerCase() : tag))
        .join(" ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      ordenSeleccionado === "az"
        ? a.title.localeCompare(b.title)
        : ordenSeleccionado === "id"
        ? a.id - b.id
        : ordenSeleccionado === "za"
        ? b.title.localeCompare(a.title)
        : ordenSeleccionado === "author"
        ? a.author.localeCompare(b.author)
        : 0
    );

  const handleFiltro = (filtro) => {
    setOrdenSeleccionado(filtro); // Esto también cambiará el criterio de orden al seleccionar un filtro
  };

  const handleTags = (event) => {
    event.preventDefault();
    setSearch(event.target.innerText);
  };

  return (
    <div id="jukebox">
      <section id="screen">
        <div id="actual-song">
          <p>
            Ahora reproduciendo:{" "}
            {playing ? (
              <span style={{ color: actual.color }}>
                {actual.title} - {actual.author}
              </span>
            ) : (
              <span style={{ color: "#616161" }}>
                Ninguna cancion seleccionada
              </span>
            )}
          </p>
          <div id="img-cont">
            {" "}
            <img className="vynil" src={image} alt={actual.title} />
          </div>
        </div>
      </section>
      <br />
      <section id="configuration">
        <form id="search-form" onSubmit={(e) => e.preventDefault()}>
          <RiSearch2Line />
          &nbsp;&nbsp;
          <input
            type="text"
            value={search}
            placeholder="¿Escuchamos musica?"
            id="music-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <hr />
          {commonTag.map((palabra, index) => (
            <button className="tags" onClick={handleTags} key={index}>
              <RiHashtag />
              {palabra}
            </button>
          ))}
          <br />
          Ordenar por:
          <ul id="tag-filter">
            <div style={{ margin: "auto", padding: "10px" }}>
              <button className="tag-menu" onClick={() => handleFiltro("az")}>
                <RiSortDesc /> A - Z
              </button>
              <button className="tag-menu" onClick={() => handleFiltro("za")}>
                <RiSortAsc /> Z - A
              </button>
              <button className="tag-menu" onClick={() => handleFiltro("id")}>
                <RiTimeLine /> Fecha de subida
              </button>{" "}
              <button
                className="tag-menu"
                onClick={() => handleFiltro("author")}
              >
                <RiUser3Line /> Autor
              </button>
            </div>
          </ul>
        </form>
      </section>

      <br />
      <section id="musicbutton-table">
        {filteredTracks.map((music) => {
          const nowPlaying = () => {
            setPlaying(playing ? false : true);
            setActual(music);
            setId(playing ? 0 : music.id);
            setImage(playing ? vynil : music.src);
          };

          return (
            <MusicButton
              isPlaying={playing}
              nowPlaying={nowPlaying}
              author={music.author}
              name={music.title}
              img={music.src}
              key={music.id}
              playingId={id}
              myId={music.id}
            />
          );
        })}
      </section>
    </div>
  );
};

export default App;
