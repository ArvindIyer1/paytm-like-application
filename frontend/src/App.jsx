import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Singup } from "./pages/Signup"
import { SendMoney } from "./pages/SendMoney"
import { Dashboard } from "./pages/Dashboard"


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element = {<Singup></Singup>}/>
        <Route path="/signin" element = {<Signin></Signin>}/>
        <Route path="/dashboard" element = {<Dashboard></Dashboard>}/>
        <Route path="/send" element = {<SendMoney></SendMoney>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
