import Navbar from "../../components/Navbar/Navbar"
import Button from "../../components/Button/Button";
import "./About.css"
import trees from "../../assets/pistachio-trees.png"
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

function About() {
  const messageBox = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [messageSent, showMessageSent] = useState(false);
  const [timeoutPromise, setTimeoutPromise] = useState<TimeoutPromise>();
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
  const sleep = (ms: number): TimeoutPromise => {
    let timeoutId: NodeJS.Timeout | null = null;

    const promise = new TimeoutPromise((resolve) => {
      timeoutId = setTimeout(() => resolve(), ms);
    });

    if(timeoutId !== null ) promise.setTimeoutId(timeoutId);
    setTimeoutPromise(promise);
  
    return promise;
  }

  const submitMessage = async() => {
    
    messageBox.current?.close();

    fetch("https://enuts.devinedwards.xyz/mail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": form.current?.elements[0],
        "email": form.current?.email.valueOf(),
        "message": form.current?.message.valueOf() 
      })
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    showMessageSent(true);
    await sleep(3000)
      .then(() => showMessageSent(false))
      .catch(e => window.alert(e))
  }


  return (
    <div>
      <Navbar location="about"/>
      <div className="about row">
        <img src={trees} alt="pistachio tree fields"/>
        <div className="story">
          <h1>Our Story</h1>
          {story}
          <div style={{display: "flex", gap: "1.5vw"}}>
            <Button buttonType="primary" textType="inverted-text-color" destination="../shop">Shop</Button>
            <Button buttonType="secondary" textType="normal-text-color" listener={openMessage}>Contact Us</Button>
          </div>
          <dialog ref={messageBox}>
            <h1>What's Up?</h1>
            <form ref={form}>
              <input id="name" name="name" placeholder="Name *" type="text" required={true}/>
              <input id="email" name="email" placeholder="Email *" type="email" required={true}/>
              <textarea id="message" name="message" rows={4} cols={80} maxLength={320} placeholder="Message *" required={true}/>
            </form>
            <div className="button-container">
              <Button buttonType="secondary" textType="normal-text-color" listener={closeMessage}>Cancel</Button>
              <Button buttonType="primary" textType="inverted-text-color" asyncListener={submitMessage}>Send</Button>
            </div>
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

export default About;

const story =
  <div>
    <p>From a humble beginning, <span className="emphasis">ENUTS</span> has grown into a prospering business. Delivering nuts from our fields straight to your doorstep, our promise is to blah blah blah...</p>
    <p>We are <span className="emphasis">not</span> a real business. However, the creator of this site is very real, and he wants to work with you! If you're interested, check out his <a className="story-link" href="https://devin-edwards.netlify.app/" target="_blank" rel="noreferrer">portfolio</a> and reach out!</p>
    <p>If you're interested in buying nuts, kirkland peanuts are my favorite. You could also try <a className="story-link" href="https://www.nutstop.com/wholesale/bulk-nuts-seeds" target="_blank" rel="noreferrer">Nutstop</a> or <a className="story-link" href="https://www.americannutcompany.com/shop" target="_blank" rel="noreferrer">American Nut Company</a> if you looking for real online nut stores. I hope you find what you're looking for!</p>
  </div>