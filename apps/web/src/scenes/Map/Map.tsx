import Navbar from "../../components/Navbar/Navbar";
import Store from "../../components/Store/Store";
import EmbeddedMap from "../../components/EmbeddedMap/EmbeddedMap";
import { useState } from "react";
import "./Map.css";

function Map() {
  const [activeMap, setActiveMap] = useState("https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJURYKcqIOIgRyO51Iut3g7E&key=");
  const [mapVisibility, setMapVisibility] = useState(1);
  const key = "AIzaSyBTF6K9I4h2Vx7xPiC2q_hhsIHOcyRClPc"
  const locations = [
    {
      name: "Krema Nut Company",
      address: "1000 Goodale Blvd, Columbus, OH 43212",
      storeLink: "https://krema.com/",
      mapsLink: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJf8lBLAKPOIgRBChJKgfE12o&key="
    },
    {
      name: "Dave's Peanuts",
      address: "414 E Mound St, Columbus, OH 43215",
      storeLink: "http://www.davespeanuts.com/",
      mapsLink: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJJURYKcqIOIgRyO51Iut3g7E&key="
    },
    {
      name: "American Nut Company",
      address: "59 Spruce St, Columbus, OH 43215",
      storeLink: "https://www.americannutcompany.com/",
      mapsLink: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ4aO04EuPOIgR9NOUxfcIU4o&key="
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
