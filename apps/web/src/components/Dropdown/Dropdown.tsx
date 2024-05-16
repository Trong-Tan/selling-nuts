import "./Dropdown.css"
import { useState } from "react";

type HandleOption = (field: string, checked: boolean) => void

function Dropdown(props: {title: string, options: string[], filter: HandleOption, sort: HandleOption, className?: string}) {
  const [revealed, reveal] = useState(true)
  const initChecked: { [key: string]: boolean } = {}
  const startChecked = props.title === "Nut"
  props.options.forEach(option => {initChecked[option] = startChecked})
  const [checked, setChecked] = useState<{ [key: string]: boolean }>(initChecked)
  const handleReveal = () => {
    revealed ? reveal(false) : reveal(true)
  }
  const arrowStyle = {
    fontSize: ".7rem",
    margin: 0,
    padding: 0
  }
  const handleOption = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const option = e.currentTarget.value;
    const tempChecked = {...checked}
    if(checked[option] == false) {
      tempChecked[option] = true;
      props.title === "Sort By" ? props.sort(option, true) : props.filter(option, true);
    } else {
      tempChecked[option] = false;
      props.title === "Sort By" ? props.sort(option, false) : props.filter(option, false);
    }
    setChecked(tempChecked);
  }

  return (
    <div>
      <div className="border-t-2 border-[#ECD2B8]" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}} 
        onClick={() => handleReveal()}>
        <h1 style={{margin: ".5rem 0 .5rem 0", fontSize: "1.1rem"}}>{props.title}</h1>
        {revealed ? <p style={arrowStyle}>▼</p> : <p style={arrowStyle}>▲</p>}
      </div>
      {revealed ? props.options.map((option, i) => 
        <div key={i} style={{position: "relative", height: "1.3rem", margin: "0 0 .3rem 3%"}}>
          <label className="dropdown">
            <input type="checkbox" id={"title-check-" + String(i)} value={option} name={option} 
              onChange={e => handleOption(e)}/>
            {option}
            <span className={"check" + (props.title === "Nut" ? " inverted-check" : " normal-check")} />
          </label>
        </div>
      ): <></>}
    </div>
  );
}

export default Dropdown;