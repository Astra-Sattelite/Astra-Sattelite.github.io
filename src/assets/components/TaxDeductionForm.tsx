import React, { useState } from "react"
import { ExpandingContent } from "./TaxDeductionFormItems"
import { useIsMobile } from "../../utils"

type SettlementOption = "payment" | "term" | ""

const SettlementSection: React.FC = () => {

  const [selectedOption, setSelectedOption] = useState<SettlementOption>("")

  const buttonStyle: React.CSSProperties = ({
    marginLeft: "28px",
    borderRadius: "50px",
    padding: "10px 16px",
    border: "transparent",
    background: "#EEF0F2"
  })

  const selectedButtonAdditionStyle: React.CSSProperties = ({
    background: "linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56",
    color: "white"
  })

  const selectedButtonStyle: React.CSSProperties = ({
    ...buttonStyle,
    ...selectedButtonAdditionStyle
  })

  const paymentButtonStyle = selectedOption === "payment" ? selectedButtonStyle : buttonStyle

  const termButtonStyle = selectedOption === "term" ? selectedButtonStyle : buttonStyle

  return (
    <div className="popupChoiceSection">
      <div className="popupInputText">Что уменьшаем?</div>
      
      <button onClick={() => setSelectedOption("payment")} style={paymentButtonStyle}>Платеж</button>

      <button onClick={() => setSelectedOption("term")} style={termButtonStyle}>Срок</button>
    </div>
  )
}

type InputFormProps = {
  showCalc: boolean
  setShowCalc: (val: boolean) => void
}

const InputForm: React.FC<InputFormProps> = ({showCalc, setShowCalc}) => {

  const [inputVal, setInputVal] = useState("")

  const [calcVal, setCalcVal] = useState<string | undefined>()
  
  return (
    <>
      <div className="popupInputContainer">
        <div className="popupInputText">Ваша зарплата в месяц</div>
        <input type="text" pattern="[0-9]*" className="popupInput" placeholder="Введите данные"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputVal(e.target.validity.valid ? e.target.value : inputVal || "")
          }
          value={inputVal}
        />
        <div className="popupInputText" onClick={() => setCalcVal(inputVal)}>Рассчитать</div>
      </div>
      <ExpandingContent calcVal={calcVal} />
    </>
  )
}

const Description: React.FC = () => {
  return (
    <div className="popupDescr">
      Используйте налоговый вычет чтобы погасить ипотеку досрочно. 
      Размер налогового вычета составляет не более 13% 
      от своего официального годового дохода.
    </div>
  )
}

type TitleProps = {
  onCalculate: () => void
}

const Title: React.FC<TitleProps> = ({onCalculate}) => {
  const isMobile = useIsMobile()

  return (
    <div onClick={onCalculate} className="popupTitleCrossContainer">
      <div className="popupTitle">Налоговый вычет</div>
      {!isMobile && <div className="popupCross" />}
    </div>
  )
}

type TaxDeductionProps = {
  setShow: (val: boolean) => void
}

export const TaxDeductionForm: React.FC<TaxDeductionProps> = ({setShow}) => {

  const [showCalc, setShowCalc] = useState(false)

  const isMobile = useIsMobile()

  const onCalculate = () => {
    setShowCalc(false)
    setShow(true)
  }

  return (
    <div className="taxBG">
      <div className={(isMobile ? "taxPopupMobile" : "taxPopup")}>
        <Title onCalculate={onCalculate} />
        <Description />
        <InputForm showCalc={showCalc} setShowCalc={setShowCalc} />
        <SettlementSection />
        <div className="temp">Добавить</div>
      </div>
    </div>
  )
}