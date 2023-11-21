import React, {useContext, useEffect, useState} from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as productService from "../service/ProductService.jsx"
import {BsCart, BsChevronDown, BsChevronUp, BsEye} from "react-icons/bs";
import {debounce} from 'lodash';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode, Pagination} from "swiper/modules";
import {toast} from "react-toastify";
import {CartContext} from "../context/Context.jsx";

function Detail() {
    const {userId,dispatch} = useContext(CartContext);
    const idProduct = useParams().idProduct;
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [showFullDetails, setShowFullDetails] = useState(false);
    const [productByCategory, setProductByCategory] = useState([]);
    const navigate = useNavigate();
    const getProductByCategory =async (id) => {
        try {
            const res = await productService.getProductByCategory(id);
            if (res.status === 200){
                setProductByCategory(res.data);
            }
        }catch (e){
            setProductByCategory([]);
        }
    };
    const getProduct = async () => {
        try {
            const res = await productService.getProduct(idProduct);
            console.log(res)
            if (res.status === 200){
                setProduct(res.data.product);
                setImages(res.data.images);
                setSelectedImage(res.data.images[0].name)
                getProductByCategory(res.data.product.idCategory);
            }else {
                setProduct(null);
                console.log("lỗi lấy data1")
            }
        }catch (e){
            setProduct(null);
            console.log("lỗi lấy data2")
        }
    };
    useEffect(() => {
        getProduct();
    }, [idProduct]);
    const chooseImage = (index) => {
        setSelectedImage(images[index].name)
    };
    const toggleDetails = debounce (() => {
        setShowFullDetails(false);
    },300);
    const handleScrollToDiv = () => {
        const targetDiv = document.getElementById('targetDiv');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 25; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    const getDefaultToDiv = () => {
        toggleDetails();
        handleScrollToDiv();
    }
    const getIntoCart = (product) => {
        if (!userId){
            navigate("/login")
            localStorage.setItem("tempURL",window.location.pathname);
            toast("Bạn phải đăng nhập trước khi thêm vào giỏ hàng")
        }else {
            dispatch({type : 'ADD_TO_CART',
                payload :
                    {
                        idUser : userId,
                        item : product
                    }
            })
        }
    };
    return (
        product &&
        <>
            <Header />
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0">
                            <Link to={"/"}>Trang chủ</Link> <span className="mx-2 mb-0">/</span>{" "}
                            <Link to="/shop">Cửa hàng</Link> <span className="mx-2 mb-0">/</span>{" "}
                            <Link to={`/category/${product.idCategory}`}>{product.nameCategory}</Link> <span className="mx-2 mb-0">/</span>{" "}
                            <strong className="text-black">{product.name}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="border text-center">
                                <img
                                    src={selectedImage}
                                    alt="Image"
                                    className="img-fluid p-5"
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    { images && images.map((image,index)=>(
                                        <img key={index} src={image.name} alt={"Small Image "+ {index}} className="img-thumbnail"
                                             style={{ width: "25%", height: "auto" }}  onClick={() => chooseImage(index)}/>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7">
                            <h2 className="text-black" id="targetDiv">{product.name}</h2>
                            <p>
                                {product.description}
                            </p>
                            <p>
                                {product.priceSale != null ? (
                                    <>
                                        <del className="mx-2">{product.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</del>
                                        <strong className="text-primary h4">
                                            {product.priceSale.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </strong>
                                    </>
                                ):(
                                    <>
                                        <strong className="text-primary h4">
                                            {product.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </strong>
                                    </>
                                )
                                }
                            </p>


                            <p>
                                <button
                                    className="btn btn-sm height-auto px-4 py-3 btn-primary"
                                    onClick={()=> getIntoCart(product)}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </p>
                            <div className="mt-5">
                                <div>
                                    <strong>Thành phần</strong>
                                </div>
                                <p style={{ whiteSpace: 'pre-line' }}>{product.ingredients}</p>
                                <div>
                                    <strong>Công dụng</strong>
                                </div>
                                <p style={{ whiteSpace: 'pre-line' }}>{product.medicalUses}</p>

                                {!showFullDetails ? (
                                    <>

                                        <div className="text-center">
                                            <button className="btn btn-link text-center" onClick={() =>setShowFullDetails(true)}>
                                                Xem thêm <BsChevronDown />
                                            </button>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <strong>Cách dùng – liều dùng</strong>
                                        </div>
                                        <p style={{ whiteSpace: 'pre-line' }}>{product.howToUse}</p>
                                        <div>
                                            <strong>Đối tượng sử dụng</strong>
                                        </div>
                                        <p style={{ whiteSpace: 'pre-line' }}>{product.intendedUsers}</p>
                                        <div>
                                            <strong>Lưu ý</strong>
                                        </div>
                                        <p style={{ whiteSpace: 'pre-line' }}>{product.precautions}</p>
                                        <strong>Bảo quản : </strong>
                                        <p className="d-inline-block">{product.storage}</p>
                                        <div>
                                            <strong>Quy cách đóng gói : </strong>
                                            <p className="d-inline-block" style={{ whiteSpace: 'pre-line' }}>{product.packaging}</p>
                                        </div>
                                        <div>
                                            <strong>Sản xuất bởi : </strong>
                                            <p className="d-inline-block" style={{ whiteSpace: 'pre-line' }}>{product.manufacturedBy}</p>
                                        </div>
                                        <div>
                                            <strong>Cơ sở phân phối : </strong>
                                            <p className="d-inline-block" style={{ whiteSpace: 'pre-line' }}>{product.distributionFacility}</p>
                                        </div>
                                        <strong >{product.caution}</strong>
                                        <div className="text-center">
                                            <button className="btn btn-link " onClick={getDefaultToDiv}>
                                                Thu gọn <BsChevronUp />
                                            </button>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {productByCategory &&
            <>
                <div className="site-section bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="title-section text-center col-12">
                                <h2 className="text-uppercase">Sản phẩm cùng loại</h2>
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
                                            productByCategory.map((item, index) =>
                                                <SwiperSlide key={index} className="t-item">
                                                    <div>
                                                        <div className="position-relative">
                                                            <img src={item.image} alt="Image" className="img-fluid" />
                                                            <div className="t-icons-overlay">
                                                                <Link to={`/detail/${item.id}`} className="t-icon-link" onClick={getDefaultToDiv}>
                                                                    <BsEye className="t-icon" />
                                                                </Link>
                                                                <a className="t-icon-link" role="button"
                                                                   onClick={()=> getIntoCart(item)}>
                                                                    <BsCart className="t-icon"/>
                                                                </a>
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

            </>
            }
            <Footer />
        </>
    );
}

export default Detail;