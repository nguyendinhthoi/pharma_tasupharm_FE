import React, {useContext, useEffect, useState} from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Pagination} from "swiper/modules";
import {Link, useNavigate} from "react-router-dom";
import * as productService from "../../service/ProductService.jsx"
import * as loginService from "../../service/LoginService.jsx"
import {BsCart, BsEye} from "react-icons/bs";
import {toast} from "react-toastify";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {CartContext} from "../Context/Context.jsx";

function Home() {
    const [bestSellers, setBestSellers] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const navigate = useNavigate();
    const {cartState,userId,dispatch} = useContext(CartContext);
    console.log(cartState)
    const getAllBestSellers = async () => {
        try {
            const res = await productService.getBestSellers();
            setBestSellers(res);
        } catch (e) {
            console.log("Không có sản phẩm")
        }
    };
    const getAllNewProducts = async () => {
        try {
            const res = await productService.getAllNewProduct();
            setNewProducts(res);
        } catch (e) {
            console.log("Không có sản phẩm")
        }
    };
    useEffect(() => {
        getAllBestSellers();
        getAllNewProducts()
    }, [userId]);
    const getIntoCart = (product) => {
        const jwtToken = loginService.getJwtToken();
        console.log(product)
        if (!jwtToken){
            navigate("/login")
            toast("Bạn phải đăng nhập trước khi thêm vào giỏ hàng")
        }else {
                dispatch({type : 'ADD_TO_CART',
                    payload :
                        {
                            idUser : userId,
                            item : product
                        }
                })
            toast("Thêm vào giỏ hàng thành công")
        }
    };
    return (
        <>
            <Header/>
            <div
                className="site-blocks-cover"
                style={{backgroundImage: 'url("../../public/images/hero_1.jpg")'}}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
                            <div className="site-block-cover-content text-center">
                                <h2 className="sub-title">
                                    Chăm sóc sức khỏe, phục hồi niềm tin. </h2>
                                <h1>Chào mừng đến với tasupharm</h1>
                                <p>
                                    <Link to={"/shop"} className="btn btn-primary px-5 py-3">
                                        Mua ngay
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section">
                <div className="container">
                    <div className="row align-items-stretch section-overlap">
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="banner-wrap bg-primary h-100">
                                <a href="#" className="h-100">
                                    <h5>
                                        Miễn phí <br/> Vận chuyển
                                    </h5>
                                    <p>
                                        <strong>
                                            Hãy tận hưởng sự thuận lợi và tiết kiệm khi mua sắm ngay hôm nay
                                        </strong>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="banner-wrap h-100">
                                <a href="#" className="h-100">
                                    <h5>
                                        Mùa Sale - Giảm Giá Lên Đến 50%
                                    </h5>
                                    <p>
                                        <strong>
                                            Đừng bỏ lỡ cơ hội mua sắm và tiết kiệm ngay hôm nay
                                        </strong>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="banner-wrap bg-warning h-100">
                                <a href="#" className="h-100">
                                    <h5>
                                        Ưu Đãi <br/> Mua Số Lượng Lớn
                                    </h5>
                                    <p>
                                        <strong>
                                            Liên hệ ngay để biết thêm chi tiết và đặt hàng
                                        </strong>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="title-section text-center col-12">
                            <h2 className="text-uppercase">Sản phẩm bán chạy</h2>
                        </div>
                    </div>
                    <div className="row">
                        {bestSellers.map((item, index) => (
                            <div key={index} className="col-sm-6 col-lg-4 text-center t-item mb-4">
                                <div className="position-relative ">
                                    <img src={item.image} alt="Image" className="img-fluid" />
                                    {
                                        item.quantity <= 0 && (
                                            <img
                                                src="https://khogiaydantuonggiare.com/uploads/images/catalogue/hethang.png"
                                                alt="Hết hàng"
                                                className="t-out-of-stock-overlay"
                                            />
                                        )
                                    }
                                    <div className="t-icons-overlay">
                                        <Link to={`/detail/${item.id}`} className="t-icon-link">
                                            <BsEye className="t-icon" />
                                        </Link>
                                        {item.quantity > 0 &&
                                            <a className="t-icon-link" role="button"
                                            onClick={()=> getIntoCart(item)}>
                                            <BsCart className="t-icon"/>
                                            </a>
                                        }
                                    </div>
                                </div>
                                <h3 className="text-dark">
                                    <p id="card-title" title={item.name}>{item.name}</p>
                                </h3>
                                <p className="price">
                                    {item.priceSale != null ? (
                                        <>
                                            <del className="mx-2">{item.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</del>
                                            {item.priceSale.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </>
                                    ):(
                                        <>
                                            {item.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </>
                                    )
                                    }
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 text-center">
                            <Link  className="btn btn-primary px-4 py-3" to={"/shop"}>
                                Tất cả sản phẩm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="title-section text-center col-12">
                            <h2 className="text-uppercase">Sản phẩm mới</h2>
                        </div>
                        <div className="col-lg-12">
                            <div className="d-flex justify-content-center align-items-center">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    freeMode={true}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[FreeMode, Pagination, Autoplay]}
                                    className="mySwiper"
                                >
                                    {
                                        newProducts.map((item, index) =>
                                            <SwiperSlide key={index} className="t-item">
                                                <div>
                                                    <div className="position-relative">
                                                        <img src={item.image} alt="Image" className="img-fluid" />
                                                        <div className="t-icons-overlay">
                                                            <Link to={`/detail/${item.id}`} className="t-icon-link">
                                                                <BsEye className="t-icon" />
                                                            </Link>
                                                            {
                                                                item.quantity > 0 &&
                                                                <a className="t-icon-link" role="button"
                                                                   onClick={()=> getIntoCart(item)}>
                                                                    <BsCart className="t-icon"/>
                                                                </a>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="text-center mb-5">
                                                        <h4 id="card-title" title={item.name}>{item.name}</h4>
                                                        <span>
                                                               {item.priceSale != null ? (
                                                                   <>
                                                                       <del className="mx-2">{item.price.toLocaleString('vi-VN', {
                                                                           style: 'currency',
                                                                           currency: 'VND'
                                                                       })}</del>
                                                                       {item.priceSale.toLocaleString('vi-VN', {
                                                                           style: 'currency',
                                                                           currency: 'VND'
                                                                       })}
                                                                   </>
                                                               ):(
                                                                   <>
                                                                       {item.price.toLocaleString('vi-VN', {
                                                                           style: 'currency',
                                                                           currency: 'VND'
                                                                       })}
                                                                   </>
                                                               )
                                                               }
                                                            </span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        )
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;