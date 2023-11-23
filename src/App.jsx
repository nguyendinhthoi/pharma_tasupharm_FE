import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Product/Detail.jsx";
import Cart from "./components/Cart/Cart.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ListSearchHome from "./components/Home/ListSearchHome.jsx";
import "../src/css/owl.carousel.min.css"
import "../src/css/owl.theme.default.min.css"
import "../src/css/jquery-ui.css"
import "../src/css/magnific-popup.css"
import "../src/css/aos.css"
import "../src/css/style.css"
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import Categories from "./components/Product/Categories.jsx";
import Shop from "./components/Product/Shop.jsx";
import Customer from "./components/Customer/Customer.jsx";

function App() {

  return (
      <>
          <PayPalScriptProvider options={{"client-id": "AWrjODvO403E_caMD3n2ryCcFV95da46WDveu8EeKg_aoOXChsNVe2DvIxfUOaaSg5YelaZm2lEw3yuR"}}>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/detail/:idProduct" element={<Detail/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/listSearchHome/:searchName" element={<ListSearchHome/>}></Route>
          <Route path="/category/:id" element={<Categories/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/info" element={<Customer/>}></Route>
        </Routes>
          <ToastContainer></ToastContainer>
          </PayPalScriptProvider>
      </>
  )
}

export default App
