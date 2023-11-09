import React, {useEffect, useState} from 'react';
import "../css/style.css"
import {Link} from "react-router-dom";
import * as loginService from "../service/LoginService.jsx"
import {BiSolidUserCircle} from "react-icons/bi";
import {BsFillCartCheckFill, BsSearch} from "react-icons/bs";
import {Dropdown} from "react-bootstrap";
import {toast} from "react-toastify";

function Header() {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const getUserId = async () => {
        const jwtToken = loginService.getJwtToken();
        const user = await loginService.getUserId(jwtToken.sub)
        setUserId(user.id);
        try {
            const res = await loginService.getCustomer(user.id);
            if (res.status === 200) {
                setUserName(res.data.name);
            }
        } catch (e) {
            setUserName("Khách vãng lai");
        }
    };
    useEffect(() => {
        getUserId();
    }, [userName]);

    const handleLogout = () => {
        localStorage.removeItem("JWT");
        setUserName(undefined);
        toast("Đăng xuất thành công");
    };
    return (
        <>
            <div className="site-wrap">
                <div className="site-navbar py-2">
                    <div className="search-wrap">
                        <div className="container">
                            <a href="#" className="search-close js-search-close">
                                <span className="icon-close2"/>
                            </a>
                            <form action="#" method="post">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search keyword and hit enter..."
                                />
                            </form>
                        </div>
                    </div>
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between w-auto">
                            <div className="logo">
                                <div className="site-logo">
                                    <Link className="js-logo-clone" to={"/"}>
                                        Pharma
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
                                            <Link to={"/"}>Home</Link>
                                        </li>
                                        <li>
                                            <a href="shop.html">Store</a>
                                        </li>
                                        <li className="has-children">
                                            <a href="#">Dropdown</a>
                                            <ul className="dropdown">
                                                <li>
                                                    <a href="#">Supplements</a>
                                                </li>
                                                <li className="has-children">
                                                    <a href="#">Vitamins</a>
                                                    <ul className="dropdown">
                                                        <li>
                                                            <a href="#">Supplements</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Vitamins</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Diet &amp; Nutrition</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Tea &amp; Coffee</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#">Diet &amp; Nutrition</a>
                                                </li>
                                                <li>
                                                    <a href="#">Tea &amp; Coffee</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="about.html">About</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="icons">
                                <a href="#">
                                    <BsSearch className="fs-4 me-5"/>
                                </a>
                                <Link className="fs-4 me-5" to={"/cart"}>
                                    <BsFillCartCheckFill/>
                                </Link>
                                <Dropdown className="d-inline-block">
                                    <Dropdown.Toggle variant={userName ? "info" : ""} id="dropdown-basic" className="bg-white border-white">
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
                                                <Dropdown.Item as={Link} to={`/infoCustomer/${userId}`}>Thông
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