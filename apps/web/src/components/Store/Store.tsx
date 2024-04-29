import "./Store.css";

type Location = {
  name: string,
  address: string,
  storeLink: string,
  mapsLink: string
}

function Store(props: {locationInfo: Location, setMap: (s: string) => void, setMapVisibility: (b: number) => void}) {
  const loc = props.locationInfo;
  const handleClick = () => {
    props.setMap(loc.mapsLink);
    props.setMapVisibility(3);
  }
  return (  
    <div className="store-preview" onClick={() => handleClick()}>
      <h1>{loc.name}</h1>
      <p>{loc.address}</p>
      {
        loc.storeLink === "" ? <></> :
          <a href={loc.storeLink} rel="noreferrer" target="_blank">
            <button>LAUNCH STORE PAGE</button>
          </a>
      }
      <div className="open-tag">
        <p>Open</p>
      </div>
    </div>
  );
}

export default Store;