import "./Button.css";
import { Link } from "react-router-dom";

interface Listener {
  (): void
}

interface AsyncListener {
  (): Promise<void>
}

function Button(props: {children: string, buttonType: string, textType: string, destination?: string, listener?: Listener, asyncListener?: AsyncListener, style?: object}) {
  if(props.listener) {
    const listener = props.listener ?? function() {return}
    return <div className={"button " + props.buttonType} onClick={() => listener()} style={{...props.style}}><p className={props.textType} style={{margin: 0, ...props.style}}>{props.children}</p></div>
  }
  if(props.asyncListener) {
    const asyncListener = props.asyncListener ?? function() {return}
    return <div className={"button " + props.buttonType} onClick={() => asyncListener()} style={{...props.style}}><p className={props.textType} style={{margin: 0, ...props.style}}>{props.children}</p></div>
  }
  if(props.destination) {
    const destination = props.destination ?? "";
    return (
      <Link to={destination} className={props.textType} style={{textDecoration: "none"}}>
        <div className={"button " + props.buttonType} >{props.children}</div>
      </Link>
    );
  }
  return <div className={"button " + props.buttonType} style={{...props.style}}><p className={props.textType} style={{margin: 0, ...props.style}}>{props.children}</p></div>
}

export default Button;
