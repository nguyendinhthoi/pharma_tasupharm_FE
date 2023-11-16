import React, {useContext, useEffect, useState} from 'react';

import {Link, useNavigate} from "react-router-dom";
import * as productService from "../service/ProductService.jsx"
import * as loginService from "../service/LoginService.jsx"
import {toast} from "react-toastify";
import {FaTimes} from "react-icons/fa";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {CartContext} from "../context/Context.jsx";

function Cart() {
    const [products, setProducts] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const cartContext = useContext(CartContext);
    const { userId, dispatch } = cartContext;
    const getAllCart = async () => {
        try {
            const res = await productService.getAllCart(userId);
            setHasResult(res.data.length > 0)
            if (res.status === 200){
                setProducts(res.data);
                getAllCart();
            }else {
                console.log("Lấy dữ liệu thất bại")
                setHasResult(false);
            }
        }catch (e){
            setHasResult(false);
        }

    };
    useEffect(() => {
        getAllCart();
    }, [userId]);

    const handleDelete =async (idProduct) => {
        console.log(idProduct)
        if (userId){
            dispatch({type : 'REMOVE_FROM_CART',
                payload :
                    {
                        idUser : userId,
                        idProduct : idProduct
                    }
            })
        }
    };
    return (
            <>
                <Header/>
                <div className="bg-light py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-0">
                                <Link to={"/"}>Trang chủ</Link> <span className="mx-2 mb-0">/</span>
                                <strong className="text-black">Giỏ hàng</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <form className="col-md-12" method="post">
                                <div className="site-blocks-table">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th className="product-thumbnail">Hình ảnh</th>
                                            <th className="product-name">Tên sản phẩm</th>
                                            <th className="product-price">Giá tiền</th>
                                            <th className="product-quantity">Số lượng</th>
                                            <th className="product-total">Đơn giá</th>
                                            <th className="product-remove">Xóa</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {   hasResult ? (
                                            products.map((item, index) => (
                                            <tr key={index}>
                                                <td className="product-thumbnail">
                                                    <img
                                                        src={item.image}
                                                        alt="Image"
                                                        className="img-fluid"
                                                    />
                                                </td>
                                                <td className="product-name">
                                                    <h2 className="h5 text-black">{item.name}</h2>
                                                </td>
                                                <td>{item.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                                <td>
                                                    <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                                                        <div className="input-group-prepend">
                                                            <button
                                                                className="btn btn-outline-primary js-btn-minus"
                                                                type="button"
                                                            >
                                                                −
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center"
                                                            defaultValue={item.quantity}
                                                            placeholder=""
                                                            aria-label="Example text with button addon"
                                                            aria-describedby="button-addon1"
                                                        />
                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn btn-outline-primary js-btn-plus"
                                                                type="button"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{(item.price * item.quantity).toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                                <td>
                                                    <a onClick={() => handleDelete(item.idProduct)} className="btn btn-primary height-auto btn-sm">
                                                        <FaTimes />
                                                    </a>
                                                </td>
                                            </tr>


                                        )))
                                        :
                                            (<tr>
                                                <td className="text-center" colSpan="6">
                                                    <b>----Trống----</b>
                                                </td>
                                            </tr>)
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-5">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <button className="btn btn-primary btn-md btn-block">
                                            Update Cart
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-outline-primary btn-md btn-block">
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="text-black h4" htmlFor="coupon">
                                            Coupon
                                        </label>
                                        <p>Enter your coupon code if you have one.</p>
                                    </div>
                                    <div className="col-md-8 mb-3 mb-md-0">
                                        <input
                                            type="text"
                                            className="form-control py-3"
                                            id="coupon"
                                            placeholder="Coupon Code"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary btn-md px-4">
                                            Apply Coupon
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pl-5">
                                <div className="row justify-content-end">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-12 text-right border-bottom mb-5">
                                                <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <span className="text-black">Subtotal</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black">$230.00</strong>
                                            </div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-md-6">
                                                <span className="text-black">Total</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black">$230.00</strong>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    className="btn btn-primary btn-lg btn-block"
                                                >
                                                    Proceed To Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
    );
}

export default Cart;