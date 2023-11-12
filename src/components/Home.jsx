import React, {useEffect, useState} from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Pagination} from "swiper/modules";
import "../css/owl.carousel.min.css"
import "../css/owl.theme.default.min.css"
import "../css/jquery-ui.css"
import "../css/magnific-popup.css"
import "../css/aos.css"
import {Link} from "react-router-dom";
import * as productService from "../service/ProductService.jsx"

function Home() {
    const [bestSellers, setBestSellers] = useState([])
    const [newProducts, setNewProducts] = useState([])
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
    }, []);
    return (
        <>
            <Header></Header>
            <>
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
                                        <a href="#" className="btn btn-primary px-5 py-3">
                                            Mua ngay
                                        </a>
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
                            {
                                bestSellers.map((item, index) =>
                                    <div key={index} className="col-sm-6 col-lg-4 text-center item mb-4">
                                        <Link to={`/detail/${item.idCategory}/${item.id}`}>
                                            {" "}
                                            <img src={item.image} alt="Image" className="img-fluid"/>
                                        </Link>
                                        <h3 className="text-dark">
                                            <Link to={`/detail/${item.idCategory}/${item.id}`}>{item.name}</Link>
                                        </h3>
                                        <p className="price">
                                            <del>95.00</del>
                                            &mdash;
                                            {item.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <a href="shop.html" className="btn btn-primary px-4 py-3">
                                    Tất cả sản phẩm
                                </a>
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
                                                <SwiperSlide key={index}>
                                                    <div>
                                                        <div>
                                                            <img src={item.image} alt="Image"
                                                                 className="img-fluid"/>
                                                        </div>
                                                        <div className="text-center mb-5">
                                                            <h4>{item.name}</h4>
                                                            <span>{item.price.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}</span>
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
                <div
                    className="site-section bg-secondary bg-image"
                    style={{backgroundImage: 'url("../../public/images/bg_2.jpg")'}}
                >
                    <div className="container">
                        <div className="row align-items-stretch">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <a
                                    href="https://nhathuocviet.vn/tin-tuc/thuoc-bo-gan-tot-nhat-hien-nay.html"
                                    className="banner-1 h-100 d-flex"
                                    target="_blank"
                                    style={{backgroundImage: 'url("../../public/images/bg_1.jpg")'}} rel="noreferrer"
                                >
                                    <div className="banner-1-inner align-self-center">
                                        <h2>Sản phẩm của chúng tôi</h2>
                                        <p>
                                            Hãy cùng khám phá và tìm hiểu thêm về những
                                            ưu điểm và đặc điểm độc đáo mà sản phẩm mang lại!
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <a
                                    href="https://vietnamcleanroom.com/vi/post/top-10-cong-ty-duoc-pham-uy-tin-viet-nam-nam-2021-589.htm"
                                    className="banner-1 h-100 d-flex"
                                    target="_blank"
                                    style={{backgroundImage: 'url("../../public/images/bg_2.jpg")'}} rel="noreferrer"
                                >
                                    <div className="banner-1-inner ms-auto  align-self-center">
                                        <h2>Đánh giá bởi chuyên gia</h2>
                                        <p>
                                            Chuyên gia của chúng tôi đã dành thời gian nghiên cứu
                                            sâu rộng để mang đến cho bạn cái nhìn sâu sắc và chi tiết nhất về trải
                                            nghiệm sử dụng sản phẩm này.
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Footer></Footer>
        </>
    );
}

export default Home;