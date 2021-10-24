import { useEffect } from "react"
import { v4 } from "uuid"

type ExpandingContentProps = {
  calcVal?: string
}

export const ExpandingContent: React.FC<ExpandingContentProps> = ({calcVal}) => {

  if (!calcVal) return <></>

  const sum = (curNum: number, res: number[]): number[] => {

    const curRes = res.reduce((a, b) => a + b, 0)

    return curRes + curNum > 260000
      ? curRes === 260000
        ? res
        : res.concat([(260000 - curRes)])
      : sum(curNum, res.concat(curNum))
  }

  const checkVal = parseInt(calcVal)

  const checkSalary = Math.floor(checkVal * 12 * 0.13)

  useEffect(() => {
    if (checkVal < 5000) alert("Введите значение равное или выше 5000")
  }, [checkVal])

  if (checkVal < 5000) return <></>

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
