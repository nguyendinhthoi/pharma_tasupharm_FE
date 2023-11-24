import React, {useContext, useEffect, useState} from 'react';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as productService from "../../service/ProductService.jsx"
import ReactPaginate from "react-paginate";
import "../../css/style.css"
import {BsCart, BsEye} from "react-icons/bs";
import * as loginService from "../../service/LoginService.jsx";
import {toast} from "react-toastify";
import {CartContext} from "../Context/Context.jsx";


function ListSearchHome() {
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
    const [totalPage, setTotalPage] = useState(0);
    const [listProductByName, setListProductByName] = useState([]);
    const [notFound, setNotFound] = useState("");
    const [currentSearchName, setCurrentSearchName] = useState("");
    const navigate = useNavigate();
    const newSearchName = useParams().searchName;
    const {userId,dispatch} = useContext(CartContext);

    const getAllSearchName = async () => {
        try {
            const res = await productService
                .getAllSearchName(newSearchName,newSearchName !== currentSearchName ? 0 : currentPage);
            console.log(res)
            if (res.status === 200){
                setCurrentSearchName(newSearchName)
                const total = res.data.totalElements;
                setTotalPage(Math.ceil(total / 6));
                setListProductByName(res.data.content);
                setNotFound("")
            }else {
                setNotFound("Không tìm thấy kết quả! Vui lòng thử lại")
            }
        }catch (e){
            console.log("Lỗi truy xuất dữ liệu");
        }
    };
    const getIntoCart = (id) => {
        const jwtToken = loginService.getJwtToken();
        if (!jwtToken){
            localStorage.setItem("tempURL",window.location.pathname);
            navigate("/login")
            toast("Bạn phải đăng nhập trước khi thêm vào giỏ hàng")
        }else {
            dispatch({type : 'ADD_TO_CART',
                payload :
                    {
                        idUser : userId,
                        idProduct : id
                    }
            })
            toast("Thêm vào giỏ hàng thành công")
        }
    };
    const handleScrollToDiv = () => {
        const targetDiv = document.getElementById('targetDiv');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 25; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };
    useEffect(() => {
        getAllSearchName();
        handleScrollToDiv();
    }, [newSearchName,currentPage]);
    useEffect(() => {
        setCurrentPage(0);
    }, [newSearchName]);
    const handlePageClick = (event) => {
        const selectedPage = +event.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <Header/>
            <div className="site-section" id="targetDiv">
                <div className="container">
                    <div className="row">
                {
                    notFound ?
                        (<p className="h5 text-center">{notFound}</p>)
                        :
                        (
                    listProductByName.map((item, index) =>
                        <div key={index} className="col-sm-6 col-lg-4 text-center t-item mb-4">
                            <div className="position-relative">
                                <img src={item.image} alt="Image" className="img-fluid" />
                                <div className="t-icons-overlay">
                                    <Link to={`/detail/${item.id}`} className="t-icon-link">
                                        <BsEye className="t-icon" />
                                    </Link>
                                    {
                                        item.quantity > 0 &&
                                        <a className="t-icon-link" role="button"
                                           onClick={()=> getIntoCart(item.id)}>
                                            <BsCart className="t-icon"/>
                                        </a>
                                    }

                                </div>
                            </div>
                            <h3 className="text-dark">
                                <Link to={`/detail/${item.idCategory}/${item.id}`} id="card-title" title={item.name}>{item.name}</Link>
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
            {!notFound ? (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="sau >"
                    onPageChange={handlePageClick}
                    pageCount={totalPage}
                    forcePage={currentPage}
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
            ) : null}
            <Footer/>
        </>
    );
}

export default ListSearchHome;