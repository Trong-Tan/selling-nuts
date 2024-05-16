import "./PromotionBar.css"
import {useEffect, useState, useMemo} from "react"

function PromotionBar() {
  const promotions = useMemo(() => {return ["50% off all non-peanut items!", "25% off pistachios"]}, []);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [runEffect, setRunEffect] = useState(true);
  const handleArrowClick = (inc: number) => {
    setRunEffect(false);
    let newPromo = currentPromo + inc;
    if(newPromo === -1) newPromo = promotions.length - 1;
    setCurrentPromo(newPromo % promotions.length);
  }

  useEffect(() => {
    if(runEffect) {
      const intervalID = setInterval(() => {
        setCurrentPromo((currentPromo + 1) % promotions.length);
      }, 3000)
  
      return () => {
        clearInterval(intervalID);
      }
    }
  }, [runEffect, currentPromo, promotions])

  return (
    <div className="promotion-bar bg-[#A46B35] text-white">
      <p className="inverted-text-color" id="left-promotion-arrow"
        onClick={() => handleArrowClick(-1)}>{"<"}</p>
      <div id="promotion-container">
        <p className="inverted-text-color" id="promotion-text">{promotions[currentPromo]}</p>
      </div>
      <p className="inverted-text-color" id="right-promotion-arrow"
        onClick={() => handleArrowClick(1)}>{">"}</p>
    </div>
  );
}

export default PromotionBar;
