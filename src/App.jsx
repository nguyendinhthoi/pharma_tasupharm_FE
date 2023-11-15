import {Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Detail from "./components/Detail.jsx";
import Cart from "./components/Cart.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ListSearchHome from "./components/ListSearchHome.jsx";
import "../src/css/owl.carousel.min.css"
import "../src/css/owl.theme.default.min.css"
import "../src/css/jquery-ui.css"
import "../src/css/magnific-popup.css"
import "../src/css/aos.css"
import "../src/css/style.css"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
      <>
          <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/detail" element={<Detail/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/listSearchHome/:searchName" element={<ListSearchHome/>}></Route>
        </Routes>
          <ToastContainer></ToastContainer>
          <Footer/>
      </>
  )
}

export default App
