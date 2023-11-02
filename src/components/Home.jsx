import React from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {Swiper,SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Pagination} from "swiper/modules";
import "../css/owl.carousel.min.css"
import "../css/owl.theme.default.min.css"
import "../css/jquery-ui.css"
import "../css/magnific-popup.css"
import "../css/aos.css"
import {Link} from "react-router-dom";



function Home() {
    return (
        <>
            <Header></Header>
            <>
                <div
                    className="site-blocks-cover"
                    style={{ backgroundImage: 'url("../../public/images/hero_1.jpg")' }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
                                <div className="site-block-cover-content text-center">
                                    <h2 className="sub-title">
                                        Effective Medicine, New Medicine Everyday
                                    </h2>
                                    <h1>Welcome To Pharma</h1>
                                    <p>
                                        <a href="#" className="btn btn-primary px-5 py-3">
                                            Shop Now
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
                                            Free <br /> Shipping
                                        </h5>
                                        <p>
                                            Amet sit amet dolor
                                            <strong>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing.
                                            </strong>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="banner-wrap h-100">
                                    <a href="#" className="h-100">
                                        <h5>
                                            Season <br /> Sale 50% Off
                                        </h5>
                                        <p>
                                            Amet sit amet dolor
                                            <strong>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing.
                                            </strong>
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="banner-wrap bg-warning h-100">
                                    <a href="#" className="h-100">
                                        <h5>
                                            Buy <br /> A Gift Card
                                        </h5>
                                        <p>
                                            Amet sit amet dolor
                                            <strong>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing.
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
                                <h2 className="text-uppercase">Popular Products</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                                <Link to={"/detail"}>
                                    {" "}
                                    <img src="../../public/images/product_01.png" alt="Image" />
                                </Link>
                                <h3 className="text-dark">
                                    <Link to={"/detail"}>Bioderma</Link>
                                </h3>
                                <p className="price">
                                    <del>95.00</del> — $55.00
                                </p>
                            </div>
                            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                                <Link to={"/detail"}>
                                    {" "}
                                    <img src="../../public/images/product_02.png" alt="Image" />
                                </Link>
                                <h3 className="text-dark">
                                    <Link to={"/detail"}>Chanca Piedra</Link>
                                </h3>
                                <p className="price">$70.00</p>
                            </div>
                            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                                <Link to={"/detail"}>
                                    {" "}
                                    <img src="../../public/images/product_03.png" alt="Image" />
                                </Link>
                                <h3 className="text-dark">
                                    <Link to={"/detail"}>Umcka Cold Care</Link>
                                </h3>
                                <p className="price">$120.00</p>
                            </div>
                            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                                <Link to={"/detail"}>
                                    {" "}
                                    <img src="../../public/images/product_04.png" alt="Image" />
                                </Link>
                                <h3 className="text-dark">
                                    <Link to={"/detail"}>Cetyl Pure</Link>
                                </h3>
                                <p className="price">
                                    <del>45.00</del> — $20.00
                                </p>
                            </div>
                            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                                <Link to={"/detail"}>
                                    {" "}
                                    <img src="../../public/images/product_05.png" alt="Image" />
                                </Link>
                                <h3 className="text-dark">
                                    <Link to={"/detail"}>CLA Core</Link>
                                </h3>
                                <p className="price">$38.00</p>
                            </div>
                            <div className="col-sm-6 col-lg-4 text-center item mb-4">
                                <Link to={"/detail"}>
                                    {" "}
                                    <img src="../../public/images/product_06.png" alt="Image" />
                                </Link>
                                <h3 className="text-dark">
                                    <Link to={"/detail"}>Poo Pourri</Link>
                                </h3>
                                <p className="price">
                                    <del>$89</del> — $38.00
                                </p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <a href="shop.html" className="btn btn-primary px-4 py-3">
                                    View All Products
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-section bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="women-item-carousel">
                                    <div className="owl-women-item owl-carousel d-flex">
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
                                            <SwiperSlide>
                                                <div className="item">
                                                    <div className="thumb">
                                                        <img style={{height: "520px", wight: "80%"}}
                                                             src="../../public/images/product_03.png"
                                                             alt=""/>
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>Umcka Cold Care</h4>
                                                        <span>$75.00</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="item">
                                                    <div className="thumb">
                                                        <img style={{height: "520px", wight: "80%"}}
                                                             src="../../public/images/product_01.png"
                                                             alt=""/>
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>Umcka Cold Care</h4>
                                                        <span>$75.00</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="item">
                                                    <div className="thumb">
                                                        <img style={{height: "520px", wight: "80%"}}
                                                             src="../../public/images/product_02.png"
                                                             alt=""/>
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>Umcka Cold Care</h4>
                                                        <span>$75.00</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="item">
                                                    <div className="thumb">
                                                        <img style={{height: "520px", wight: "80%"}}
                                                             src="../../public/images/product_04.png"
                                                             alt=""/>
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>Umcka Cold Care</h4>
                                                        <span>$75.00</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="item">
                                                    <div className="thumb">
                                                        <img style={{height: "520px", wight: "80%"}}
                                                             src="../../public/images/product_06.png"
                                                             alt=""/>
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>Umcka Cold Care</h4>
                                                        <span>$75.00</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="title-section text-center col-12">
                                <h2 className="text-uppercase">Testimonials</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 block-3 products-wrap">
                                <div className="nonloop-block-3 no-direction owl-carousel">
                                    <div className="testimony">
                                        <blockquote>
                                            <img
                                                src="../../public/images/person_1.jpg"
                                                alt="Image"
                                                className="img-fluid w-25 mb-4 rounded-circle"
                                            />
                                            <p>
                                                “Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Nemo omnis voluptatem consectetur quam tempore obcaecati
                                                maiores voluptate aspernatur iusto eveniet, placeat ab quod
                                                tenetur ducimus. Minus ratione sit quaerat unde.”
                                            </p>
                                        </blockquote>
                                        <p>— Kelly Holmes</p>
                                    </div>
                                    <div className="testimony">
                                        <blockquote>
                                            <img
                                                src="../../public/images/person_2.jpg"
                                                alt="Image"
                                                className="img-fluid w-25 mb-4 rounded-circle"
                                            />
                                            <p>
                                                “Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Nemo omnis voluptatem consectetur quam tempore obcaecati
                                                maiores voluptate aspernatur iusto eveniet, placeat ab quod
                                                tenetur ducimus. Minus ratione sit quaerat unde.”
                                            </p>
                                        </blockquote>
                                        <p>— Rebecca Morando</p>
                                    </div>
                                    <div className="testimony">
                                        <blockquote>
                                            <img
                                                src="../../public/images/person_3.jpg"
                                                alt="Image"
                                                className="img-fluid w-25 mb-4 rounded-circle"
                                            />
                                            <p>
                                                “Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Nemo omnis voluptatem consectetur quam tempore obcaecati
                                                maiores voluptate aspernatur iusto eveniet, placeat ab quod
                                                tenetur ducimus. Minus ratione sit quaerat unde.”
                                            </p>
                                        </blockquote>
                                        <p>— Lucas Gallone</p>
                                    </div>
                                    <div className="testimony">
                                        <blockquote>
                                            <img
                                                src="../../public/images/person_4.jpg"
                                                alt="Image"
                                                className="img-fluid w-25 mb-4 rounded-circle"
                                            />
                                            <p>
                                                “Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Nemo omnis voluptatem consectetur quam tempore obcaecati
                                                maiores voluptate aspernatur iusto eveniet, placeat ab quod
                                                tenetur ducimus. Minus ratione sit quaerat unde.”
                                            </p>
                                        </blockquote>
                                        <p>— Andrew Neel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="site-section bg-secondary bg-image"
                    style={{ backgroundImage: 'url("../../public/images/bg_2.jpg")' }}
                >
                    <div className="container">
                        <div className="row align-items-stretch">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <a
                                    href="#"
                                    className="banner-1 h-100 d-flex"
                                    style={{ backgroundImage: 'url("../../public/images/bg_1.jpg")' }}
                                >
                                    <div className="banner-1-inner align-self-center">
                                        <h2>Pharma Products</h2>
                                        <p>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            Molestiae ex ad minus rem odio voluptatem.
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <a
                                    href="#"
                                    className="banner-1 h-100 d-flex"
                                    style={{ backgroundImage: 'url("../../public/images/bg_2.jpg")' }}
                                >
                                    <div className="banner-1-inner ml-auto  align-self-center">
                                        <h2>Rated by Experts</h2>
                                        <p>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            Molestiae ex ad minus rem odio voluptatem.
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