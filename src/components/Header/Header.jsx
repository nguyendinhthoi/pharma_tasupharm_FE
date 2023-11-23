import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import * as loginService from "../../service/LoginService.jsx"
import * as productService from "../../service/ProductService.jsx"
import {BiSolidUserCircle} from "react-icons/bi";
import {BsFillCartCheckFill, BsSearch} from "react-icons/bs";
import {Dropdown} from "react-bootstrap";
import {toast} from "react-toastify";
import {CartContext} from "../Context/Context.jsx";
import {AiFillDelete} from "react-icons/ai";

function Header() {
    const [userName, setUserName] = useState("");
    const [categories, setCategories] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchName, setSearchName] = useState("");
    const navigate = useNavigate();
    const {cartState,dispatch,userId,setUserId} = useContext(CartContext);
    const {cartItem} = cartState;
    console.log(cartItem)
    const getUserId = async () => {
        const jwtToken = loginService.getJwtToken();
        const user = await loginService.getUser(jwtToken.sub)
        setUserId(user.id);
        try {
            const res = await loginService.getCustomer(user.id);
            console.log(res)
            if (res.status === 200) {
                setUserName(res.data.name);
            }
        } catch (e) {
            setUserName("Khách vãng lai");
        }
    };
    const getCart = async () => {
        if (userId){
            navigate("/cart");
        }else {
            navigate("/login");
            toast("Bạn phải đăng nhập trước khi vào giỏ hàng")
        }
    };
    const getCategories = async () => {
        try {
            const res = await productService.getAllCategories();
            setCategories(res);
        } catch (e) {
            console.log("Không tìm thấy")
        }
    };
    useEffect(() => {
        getUserId();
        getCategories();
    }, [userName,cartItem]);

    const handleLogout = () => {
        localStorage.removeItem("JWT");
        setUserName(undefined);
        setUserId(undefined);
        navigate("/")
        toast("Đăng xuất thành công");
    };
    const openSearch = () => {
        setIsSearchActive(true);
    };
    const closeSearch = () => {
        setIsSearchActive(false);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchName.trim() !== ''){
           searchName && navigate(`/listSearchHome/${searchName.trim()}`)
        }else if (event.key === 'Escape'){
            setIsSearchActive(false)
        }
    };


    const handleDelete = (idProduct) => {
        console.log(idProduct)
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                idUser: userId,
                idProduct: idProduct,
            },
        })
    };
    return (
        <>
            <div className="site-wrap">
                <div className="site-navbar py-2">
                    <div className={`search-wrap ${isSearchActive ? 'active' : ''}`}>
                        <div className="container">
                            <a href="#" className="search-close js-search-close" onClick={closeSearch}>
                                <span className="icon-close2"/>
                            </a>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm từ khóa bạn muốn ở đây ..."
                                        onChange={(values)=> setSearchName(values.target.value)}
                                        onKeyDown={handleKeyPress}
                                    />
                        </div>
                    </div>
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between w-auto">
                            <div className="logo">
                                <div className="site-logo">
                                    <Link className="js-logo-clone" to={"/"}>
                                        <img style={{width: "200px", height: "auto"}} src="../../../public/images/logo.jpg"
                                             alt="logo"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="main-nav d-none d-lg-block">
                                <nav
                                    className="site-navigation text-right text-md-center"
                                    role="navigation"
                                >
                                    <ul className="site-menu js-clone-nav d-none d-lg-block">
                                        <li className="active">
                                            <Link to={"/"}>Trang chủ</Link>
                                        </li>
                                        <li>
                                            <Link to={"/shop"} >Cửa hàng</Link>
                                        </li>
                                        <li className="has-children">
                                            <a href="#">Danh mục</a>
                                            <ul className="dropdown">
                                                {categories.map((category, index) =>
                                                    <Link key={index} to={`/category/${category.id}`}>
                                                        <li className="mb-4">{category.name}</li>
                                                    </Link>
                                                )}
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="about.html">Về chúng tôi</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="icons">
                                <a href="#">
                                    <BsSearch className="fs-4 me-5" onClick={openSearch}/>
                                </a>
                                <div className="t-cart-dropdown-container">
                                    <div className="fs-4-container" role="button" onClick={() => getCart()}>
                                        <BsFillCartCheckFill className="fs-4" />
                                        {userName && <span className="t-cart-item-count">{cartItem.length}</span>}
                                    </div>
                                    <div className="t-cart-dropdown-content">
                                        {cartItem.length > 0 ? (cartItem.map((item, index) => (
                                            <div className="t-cartItem-hover" key={index}>
                                                <img src={item.image} className="t-cartItemImg-hover" alt={item.name} />
                                                <div className="t-cartItemDetail-hover">
                                                    <span id="card-title-hover" title={item.name}>{item.name}</span>
                                                    <span>{item.priceSale == null ? (item.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })) : (item.priceSale.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }))}</span>
                                                </div>
                                                <AiFillDelete
                                                    fontSize="20px"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(item.idProduct ? item.idProduct : item.id)}
                                                />
                                            </div>
                                        ))):
                                            (
                                                <div className="text-center text-danger">Giỏ hàng trống</div>
                                            )}
                                    </div>
                                </div>


                                <Dropdown className="d-inline-block">
                                    <Dropdown.Toggle variant={userName ? "info" : ""} id="dropdown-basic"
                                                     className="bg-white border-white">
                                        {userName ? (
                                            <span>
                                                {userName}
                                            </span>
                                        ) : (
                                            <Link to="/login">
                                                <BiSolidUserCircle className="fs-3"/>
                                            </Link>
                                        )}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {userName && (
                                            <>
                                                <Dropdown.Item as={Link} to={`/info`}>Thông
                                                    tin</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {
                                                    handleLogout();
                                                }}>Đăng xuất</Dropdown.Item>
                                            </>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;