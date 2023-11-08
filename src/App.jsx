import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Detail from "./components/Detail.jsx";
import Cart from "./components/Cart.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
      <>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/detail" element={<Detail/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
          <ToastContainer></ToastContainer>
      </>
  )
}

export default App
