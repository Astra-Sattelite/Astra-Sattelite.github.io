type WelcomePageProps = {
  show: boolean,
  setShow: (x: boolean) => void
}

export const WelcomePage: React.FC<WelcomePageProps> = ({show, setShow}) => {

  return (
    <div className={"startBG"}>
      <button onClick={() => setShow(false)} className={"startBtn"}>Налоговый вычет</button>
    </div>
  )
}