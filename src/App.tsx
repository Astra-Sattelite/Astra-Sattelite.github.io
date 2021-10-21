import "./assets/styles/start.css"
import * as Utils from "./utils"
import { useState } from "react"

const TaxDeduction = () => {

}

interface Show {
  show: boolean,
  setShow: (x: boolean) => void
}

const StartBG = (props: Show) => {

  return (
    <div className={"startBG"}>
      <button onClick={() => props.setShow(false)} className={"startBtn"}>Налоговый вычет</button>
    </div>
  )
}

const App = () => {

  const [show, setShow] = useState(true)
  
  const isMobile = () => {

    const [width, height] = Utils.useWindowSize()

    return height > width && height > 500 ? true : false
  }

  return (
    <>
      {show 
        ? <StartBG show={show} setShow={setShow} /> 
        : <div>Not Show</div>
      }
    </>
  )
}

export default App