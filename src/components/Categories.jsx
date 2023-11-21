import React, {useContext, useEffect, useState} from 'react';
import Header from "./Header.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BsCart, BsEye} from "react-icons/bs";
import ReactPaginate from "react-paginate";
import Footer from "./Footer.jsx";
import {CartContext} from "../context/Context.jsx";
import * as productService from "../service/ProductService.jsx";
import * as loginService from "../service/LoginService.jsx";
import {toast} from "react-toastify";

function Categories() {
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
    const [totalPage, setTotalPage] = useState(0);
    const [listProductByCategory, setListProductByCategory] = useState([]);
    const [notFound, setNotFound] = useState("");
    const navigate = useNavigate();
    const {userId,dispatch} = useContext(CartContext);
    const idCategory = useParams().id;

    const getAllProductByCategory = async () => {
        try {
            const res = await productService
                .getAllProductByCategory(idCategory,currentPage);
            console.log(res)
            if (res.status === 200){
                const total = res.data.totalElements;
                setTotalPage(Math.ceil(total / 6));
                setListProductByCategory(res.data.content);
                setNotFound("")
            }else {
                setNotFound("Không tìm thấy kết quả! Vui lòng thử lại")
            }
        }catch (e){
            console.log("Lỗi truy xuất dữ liệu");
        }
    };
    const getIntoCart = (product) => {
        console.log(product)
        if (!userId){
            localStorage.setItem("tempURL",window.location.pathname);
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
        }
    };
    useEffect(() => {
        getAllProductByCategory()
    }, [idCategory,currentPage]);
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected);
    };
    return (
        <>
            <Header/>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        {
                            notFound ?
                                (<p className="h5 text-center">{notFound}</p>)
                                :
                                (
                                    listProductByCategory.map((item, index) =>
                                        <div key={index} className="col-sm-6 col-lg-4 text-center t-item mb-4">
                                            <div className="position-relative">
                                                <img src={item.image} alt="Image" className="img-fluid" />
                                                <div className="t-icons-overlay">
                                                    <Link to={`/detail/${item.id}`} className="t-icon-link">
                                                        <BsEye className="t-icon" />
                                                    </Link>
                                                    <a className="t-icon-link" role="button"
                                                       onClick={()=> getIntoCart(item)}>
                                                        <BsCart className="t-icon"/>
                                                    </a>
                                                </div>
                                            </div>
                                            <h3 className="text-dark">
                                                <Link to={`/detail/${item.id}`} id="card-title" title={item.name}>{item.name}</Link>
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
                                    ))
                        }
                    </div>
                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="sau >"
                onPageChange={handlePageClick}
                pageCount={totalPage}
                previousLabel="< trước"
                renderOnZeroPageCount={false}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}

                containerClassName={"pagination justify-content-center"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            <Footer/>
        </>
    );
}

export default Categories;