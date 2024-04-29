import "./EmbeddedMap.css";

function EmbeddedMap(props: {source: string, invisibleMap: number, setMapVisibility: (n: number) => void}) {
  return (
    <div className="map-container" style={{zIndex: props.invisibleMap}}>
      <div id="return-to-stores" onClick={() => props.setMapVisibility(1)}>
        <p>Back</p>
      </div>
      <iframe
        className={"google-map "}
        loading="lazy"
        src={props.source}
      ></iframe>
    </div>
  );
}

export default EmbeddedMap;