import "./assets/styles/start.css"
import "./assets/styles/taxDeduction.css"
import { WelcomePage } from "./assets/components/WelcomePage"
import { TaxDeductionForm } from "./assets/components/TaxDeductionForm"
import { useState } from "react"

export const App = () => {

  const [show, setShow] = useState(false)

  const CurrentPage = () =>
    show
      ? <WelcomePage show={show} setShow={setShow} /> 
      : <TaxDeductionForm setShow={setShow} />

  return (
    <div>
      <CurrentPage />
    </div>
  )
}