import "./assets/styles/test.css"
import * as Utils from "./utils"

const App = () => {
  
  const windowDimensions = () => {

    const [width, height] = Utils.useWindowSize();

    return {width, height}
  }

  const isMobile = () => {

    const height = windowDimensions().height

    const width = windowDimensions().width

    return height > width && height > 500 ? true : false
  }

  return (
    <div className={"test" + (isMobile() ? " mobile" : "")}>
    </div>
  )
}

export default App