// import Button from "../../components/Button/Button";
import "./style/About.css"
import trees from "@/assets/pistachio-trees.png"
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

class TimeoutPromise extends Promise<void> {
  timeoutId?: ReturnType<typeof setTimeout>;
  clear =  () => this.timeoutId == null ? window.alert("no timeout id") : clearTimeout(this.timeoutId);

  setTimeoutId = (timeoutId: ReturnType<typeof setTimeout>) => {
    this.timeoutId = timeoutId;
  }

  constructor(ex: (res: () => void) => void) {
    super(ex);
  }
}

export default function Component() {
  const messageBox = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [messageSent, showMessageSent] = useState(false);
  const [timeoutPromise] = useState<TimeoutPromise>();
  const openMessage = () => {
    messageBox.current !== null ? messageBox.current.showModal() : window.alert("An unexpected error has occurred.\nTry contacting us at our email: wehavenoemail@fakeemail.com");
  }
  const closeMessage = () => {
    messageBox.current?.close();
  }
  const closeMessageSent = () => {
    showMessageSent(false);
    timeoutPromise?.clear();
  }


  return (
    <div>
      <div className="about row ">
        <img src={trees} alt="pistachio tree fields"/>
        <div className="story">
          <h1>Our Story</h1>
          {story}
          <div style={{display: "flex", gap: "1.5vw"}}>
            <Button className="bg-[#A46B35] text-white rounded-lg">Shop</Button>
            <Button className="bg-[#ECD2B8] text-black rounded-lg">Contact Us</Button>
          </div>
          <dialog ref={messageBox}>
            <h1>What's Up?</h1>
            <form ref={form}>
              <input id="name" name="name" placeholder="Name *" type="text" required={true}/>
              <input id="email" name="email" placeholder="Email *" type="email" required={true}/>
              <textarea id="message" name="message" rows={4} cols={80} maxLength={320} placeholder="Message *" required={true}/>
            </form>
          </dialog>
        </div>
      </div>
      <div className={"message-sent" + (messageSent ? "" : " hidden")}>
        <p className="message-sent-text">message sent</p>
        <p className="close-message-sent" onClick={() => closeMessageSent()}>x</p>
      </div>
    </div>
  );
}



const story =
<div>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
