import "./Button.css";
import { Link } from "react-router-dom";

interface Listener {
  (): void
}

interface AsyncListener {
  (): Promise<void>
}

function Button(props: {children: string, buttonType: string, textType: string, destination?: string, listener?: Listener, asyncListener?: AsyncListener, style?: object, className?: string, onClick?: () => void}) {
  const { className, onClick, ...restProps } = props;

  if(props.listener) {
    return <div className={"button " + props.buttonType + " " + className} onClick={() => props.onClick?.()} style={{...props.style}}><p className={props.textType} style={{margin: 0, ...props.style}}>{props.children}</p></div>
  }
  if(props.asyncListener) {
    return <div className={"button " + props.buttonType + " " + className} onClick={() => props.onClick?.()} style={{...props.style}}><p className={props.textType} style={{margin: 0, ...props.style}}>{props.children}</p></div>
  }
  if(props.destination) {
    const destination = props.destination ?? "";
    return (
      <Link to={destination} className={props.textType + " " + className} style={{textDecoration: "none"}} onClick={onClick}>
        <div className={"button " + props.buttonType + " " + className} {...restProps}>{props.children}</div>
      </Link>
    );
  }
  return <div className={"button " + props.buttonType + " " + className} style={{...props.style}} onClick={onClick}><p className={props.textType} style={{margin: 0, ...props.style}}>{props.children}</p></div>
}

export default Button;
