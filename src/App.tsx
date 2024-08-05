import { ToastContainer } from "react-toastify"
import "./App.css"
import useRouteElements from "./useRouteElements"

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <ToastContainer />
      <div>{routeElements}</div>
    </>
  )
}

export default App
