import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  // Need two useState to make sure we will have the name Welcome Shaunak after adding the input pressing the button
  const playerName=useRef();

  const [name, setName] = useState(null);

  function handleClickButton(){

    setName(playerName.current.value)
    playerName.current.value=""
  }

  return (
    <section id="player">
      <h2>Welcome {(name)??'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClickButton}>Set Name</button>
      </p>
    </section>
  );
}
