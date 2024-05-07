import Navbar from "../../components/Navbar/Navbar";
import Store from "../../components/Store/Store";
import EmbeddedMap from "../../components/EmbeddedMap/EmbeddedMap";
import { useState } from "react";
import "./Map.css";

function Map() {
  const [activeMap, setActiveMap] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7671.320565704941!2d108.2470696918418!3d15.979107538749378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142112b827eda13%3A0x588507e0d1b6fc36!2sKhu%20K%20-%20%C4%90H%20VKU!5e0!3m2!1svi!2s!4v1715049802146!5m2!1svi!2s");
  const [mapVisibility, setMapVisibility] = useState(1);
  const key = "AIzaSyBTF6K9I4h2Vx7xPiC2q_hhsIHOcyRClPc"
  const locations = [
    {
      name: "lorem lorem lorem",
      address: "1000 lorem, lorem, lorrem 43212",
      storeLink: "https://lorrem.com/",
      mapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8952.839938115987!2d108.20887177157552!3d16.02796671437569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421993058c6045%3A0x4dbbb9ccec61fee3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1715050279564!5m2!1svi!2s"
    },
    {
      name: "lorem lorem lorem",
      address: "1000 lorem, lorem, lorrem 43212",
      storeLink: "http://www.lorrem.com/",
      mapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8952.839938115987!2d108.20887177157552!3d16.02796671437569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421993058c6045%3A0x4dbbb9ccec61fee3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1715050279564!5m2!1svi!2s"
    },
    {
      name: "lorem lorem lorem",
      address: "1000 lorem, lorem, lorrem 43212",
      storeLink: "https://www.americannutcompany.com/",
      mapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8952.839938115987!2d108.20887177157552!3d16.02796671437569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421993058c6045%3A0x4dbbb9ccec61fee3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1715050279564!5m2!1svi!2s"
    }
  ] 

  return (
    <div className="map">
      <Navbar location="map" />
      <h1 id="map-title">Find A Store</h1>
      <div id="map-area">
        <div className="search-area">
          {locations.map((e, i) => <Store key={i} locationInfo={e} setMap={setActiveMap} setMapVisibility={setMapVisibility}/>)}
        </div>
        <EmbeddedMap source={activeMap + key} invisibleMap={mapVisibility} setMapVisibility={setMapVisibility}/> 
      </div>
    </div>
  );
}

export default Map;
