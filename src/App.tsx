import "./assets/styles/start.css"
import "./assets/styles/taxDeduction.css"
import * as Utils from "./utils"
import React, { useState } from "react"
import CSS from "csstype"
import { v4 } from "uuid"

interface ExpandingContentProps {
  inputVal: string,
  setInputVal: (val: string) => void
}

const ExpandingContent = (props: ExpandingContentProps) => {

  const sum = (curNum: number, res: number[]): number[] => {

    const curRes = res.reduce((a, b) => a + b, 0)

    return curRes + curNum > 260000
      ? curRes === 260000
        ? res
        : res.concat([(260000 - curRes)])
      : sum(curNum, res.concat(curNum))
  }

  const checkSalary = Math.floor(parseInt(props.inputVal) * 12 * 0.13)

  return (
    <>
      <div className="popupSalaryText">Итого вы можете внести досрочных:</div>
      {sum(checkSalary, []).map((item, i) =>
        <>
          <div className="popupItem" key={v4()}>
            <input type="checkbox" />
            <div className="popupItemText">{item}</div>
            <div className="popupItemGrayText">В {i + 1} год</div>
          </div>
          <hr className="popupItemLine"/>
        </>
      )}
    </>
  )
}

type PorT = "payment" | "term" | ""

interface TaxProps {
  setShow: (val: boolean) => void
}

const TaxDeduction = (props: TaxProps) => {

  const [showCalc, setShowCalc] = useState(false)

  const [inputVal, setInputVal] = useState("")

  const [paymentOrTerm, setPorT] = useState<PorT>("")

  const isMobile = () => {

    const [width, height] = Utils.useWindowSize()

    console.log(height > width && height >= 320 ? true : false)

    return height > width && height >= 320 ? true : false
  }

  const payment = (): CSS.Properties => {
    return {
      marginLeft: "44px",
      borderRadius: "50px",
      padding: "10px 16px",
      border: "transparent",
      background: (paymentOrTerm == "payment") 
        ? "linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56"
        : "#EEF0F2",
      color: (paymentOrTerm == "payment") 
        ? "white"
        : "black"
    }
  }

  const term = (): CSS.Properties => {
    return {
      marginLeft: "28px",
      borderRadius: "50px",
      padding: "10px 16px",
      border: "transparent",
      background: (paymentOrTerm == "term") 
        ? "linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56" 
        : "#EEF0F2",
      color: (paymentOrTerm == "term") 
        ? "white"
        : "black"
    }
  }

  return (
    <div className="taxBG">
      <div className={"taxPopup" + (isMobile() ? " mobile" : "")}>
        <div onClick={() => {
          setShowCalc(false),
          props.setShow(true)
        }} className="popupTitleCrossContainer">
          <div className="popupTitle">Налоговый вычет</div>
          {isMobile() ? <></> : <div className="popupCross" />}
        </div>

        <div className="popupDescr">Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.</div>

        <div className="popupInputContainer">
          <div className="popupInputText">Ваша зарплата в месяц</div>
          <input type="text" pattern="[0-9]*" className="popupInput" placeholder="Введите данные"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputVal(e.target.validity.valid ? e.target.value : inputVal)
            }
            value={inputVal}
          />
          <div className="popupInputText" onClick={() => setShowCalc(true)}>Рассчитать</div>
        </div>
        {showCalc
          ? <ExpandingContent inputVal={inputVal} setInputVal={setInputVal} />
          : <></>
        }
        <div className="popupChoiceSection">
          <div className="popupInputText">Что уменьшаем?</div>
          
          <button onClick={() => setPorT("payment")} style={payment()}>Платеж</button>

          <button onClick={() => setPorT("term")} style={term()}>Срок</button>
        </div>

        <div className="temp">Добавить</div>
      </div>
    </div>
  )
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

  const [show, setShow] = useState(false)

  return (
    <div className="min">
      {show 
        ? <StartBG show={show} setShow={setShow} /> 
        : <TaxDeduction setShow={setShow} />
      }
    </div>
  )
}

export default App