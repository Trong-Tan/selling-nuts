import "./style/Error.css";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import { useRouteError } from "react-router-dom";
import sadPeanut from "@/assets/sad-peanut.png"

export default function Component(props: {error?: string}) {
  let errorMessage = useRouteError();
  if(errorMessage == undefined) {
    errorMessage = props.error;
  }
  const listener = (): void => {
    window.alert("here's the error we received:\n\n" + errorMessage)
    console.log(errorMessage);
  }

  return (
    <div>
      <Navbar location="error"/>
      <div className="error-element">
        <div>
          <h1>Sorry :(</h1>
          <h2>We couldn't process your request. </h2>
          <h2>Please try again.</h2>
          <div className="button-container">
            <Button buttonType="primary" textType="inverted-text-color" destination="..">Home</Button>
            <Button buttonType="secondary" textType="normal-text-color" listener={listener}>View Error Message</Button>
          </div>
        </div>
        <img src={sadPeanut} alt="ashamed peanut" className=""/>
      </div>
    </div>
  );
}

