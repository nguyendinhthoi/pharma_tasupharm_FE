import React, { useContext, useEffect, useState } from 'react';
import Header from "../Header/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { BsCart, BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import Footer from "../Footer/Footer.jsx";
import { CartContext } from "../Context/Context.jsx";
import * as productService from "../../service/ProductService.jsx";
import { toast } from "react-toastify";
import 'rc-slider/assets/index.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Shop() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listProduct, setListProduct] = useState([]);
    const navigate = useNavigate();
    const { userId, dispatch } = useContext(CartContext);
    const [value, setValue] = useState([50000,1000000]);
    const [choose, setChoose] = React.useState('');
    const [notFound, setNotFound] = useState(false);

    const getAllProduct = async () => {
        try {
            const res = await productService.getAllProduct(currentPage ,value,choose);
            if (res.status === 200) {
                const total = res.data.totalElements;
                setTotalPage(Math.ceil(total / 6));
                setListProduct(res.data.content);
                setNotFound("")

            } else {
                setNotFound("Không tìm thấy kết quả! Vui lòng thử lại")
            }
        } catch (e) {
            console.log("Lỗi truy xuất dữ liệu");
        }
    };

    const getIntoCart = (product) => {
        if (!userId) {
            localStorage.setItem("tempURL", window.location.pathname);
            navigate("/login");
            toast("Bạn phải đăng nhập trước khi thêm vào giỏ hàng");
        } else {
            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    idUser: userId,
                    item: product,
                },
            });
            toast("Thêm vào giỏ hàng thành công")
        }
    };

    function valuetext(value) {
        return `${value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeStop = (event,newValue) => {
        setValue(newValue)
        getAllProduct();
    };
    const handleScrollToDiv = () => {
        const targetDiv = document.getElementById('targetDiv');
        if (targetDiv) {
            const targetOffset = targetDiv.offsetTop - 25; // Khoảng cách từ phía trên
            window.scrollTo({top: targetOffset, behavior: 'smooth'});
        }
    };

    useEffect(() => {
        getAllProduct();
        handleScrollToDiv();
    }, [currentPage,choose]);
    useEffect(() => {
        setCurrentPage(0)
    }, [value]);


    const handlePageClick = (event) => {
        setCurrentPage(+event.selected);
    };

    const handleChangePrice = (event) => {
        setChoose(event.target.value);
    };

    return (
        <>
            <Header />
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0" id="targetDiv">
                            <Link to={"/"}>Trang chủ</Link><span className="mx-2 mb-0">/</span>{" "}
                            <strong className="text-black">Cửa hàng</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between mt-lg-5">
                <div>
                    <p>Chọn khoảng giá: Từ <b>{value[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b> đến <b>{value[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            onChangeCommitted={handleChangeStop}
                            valueLabelDisplay="auto"
                            valueLabelFormat={valuetext}
                            min={50000}
                            max={1000000}
                        />
                    </Box>
                </div>
                <FormControl sx={{ m: 1, minWidth: 105 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Sắp xếp</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={choose}
                        onChange={handleChangePrice}
                        autoWidth
                        label="Giá"
                    >
                        <MenuItem value="">
                            <em>Mặc định</em>
                        </MenuItem>
                        <MenuItem value={"desc"}>Giá giảm dần</MenuItem>
                        <MenuItem value={"asc"}>Giá tăng dần</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {
                notFound ?
                    (<p className="h5 text-center">{notFound}</p>)
                    :
                    (
                        <div className="site-section">
                            <div className="container">
                                <div className="row">
                                    {listProduct.map((item, index) => (
                                        <div key={index} className="col-sm-6 col-lg-4 text-center t-item mb-4">
                                            <div className="position-relative">
                                                <img src={item.image} alt="Image" className="img-fluid" />
                                                <div className="t-icons-overlay">
                                                    <Link to={`/detail/${item.id}`} className="t-icon-link">
                                                        <BsEye className="t-icon" />
                                                    </Link>
                                                    {
                                                        item.quantity > 0 &&
                                                        <a className="t-icon-link" role="button" onClick={() => getIntoCart(item)}>
                                                            <BsCart className="t-icon" />
                                                        </a>
                                                    }

                                                </div>
                                            </div>
                                            <h3 className="text-dark">
                                                <Link to={`/detail/${item.id}`} id="card-title" title={item.name}>
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="price">
                                                {item.priceSale != null ? (
                                                    <>
                                                        <del className="mx-2">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                                                        {item.priceSale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
            }
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
            <Footer />
        </>
    );
}

export default Shop;
