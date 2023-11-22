import React, {useEffect, useState} from 'react';
import "../../css/style.css"
import * as productService from "../../service/ProductService.jsx"
import {Link} from "react-router-dom";


function Footer() {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const res = await productService.getAllCategories();
            setCategories(res);
        } catch (e) {
            console.log("Không tìm thấy")
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
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
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <div className="block-7">
                                <h3 className="footer-heading mb-4">Về chúng tôi</h3>
                                <p>
                                    Được thành lập vào đầu năm 2023, chúng tôi cam kết mang đến những sản phẩm
                                    chất lượng và dịch vụ tận tâm, giúp bạn duy trì một lối sống khỏe mạnh và an lành.
                                    Cùng Tasupharm, hãy chắp cánh cho sức khỏe và hạnh phúc của bạn!
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 mx-auto mb-5 mb-lg-0">
                            <h3 className="footer-heading mb-4">Chuyển nhanh</h3>
                            <ul className="list-unstyled">
                                {
                                    categories.map((item, index) =>
                                        <li key={index}>
                                            <Link className="text-decoration-none" to={`/category/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="block-5 mb-5">
                                <h3 className="footer-heading mb-4">Thông tin liên hệ</h3>
                                <ul className="list-unstyled">
                                    <li className="address">
                                        K353/50 Cách mạng tháng 8, Hòa Thọ Đông, Cẩm Lệ, Đà Nẵng
                                    </li>
                                    <li className="phone">
                                        <a href="tel://0784443801">+84.784.443.801</a>
                                    </li>
                                    <li className="email">dinhthoi2411@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-5 mt-5 text-center">
                        <div className="col-md-12">
                            <p>
                                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                Copyright © All rights reserved | Website này được thiết kế{" "}
                                <i className="icon-heart" aria-hidden="true"/> bởi{" "}
                                <a
                                    href="https://www.facebook.com/profile.php?id=100003829578976"
                                    target="_blank"
                                    className="text-primary" rel="noreferrer"
                                >
                                    DinhThoi
                                </a>
                                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Footer;