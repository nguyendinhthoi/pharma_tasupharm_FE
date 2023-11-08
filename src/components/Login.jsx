import React, {useState} from 'react';
import "../css/login.css"
import {Field, Form, Formik} from "formik";
import * as loginService from "../service/LoginService.jsx"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Login() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsRightPanelActive(true);
    };

    const handleLoginClick = () => {
        setIsRightPanelActive(false);
    };
    const initialValuesLogin = {
        userName: "",
        password: ""
    }
    const handleLogin = async (values) => {
        const res = await loginService.login(values);
        loginService.addJwtTokenToLocalStorage(res.data.jwtToken);
        const tempURL = localStorage.getItem("tempURL");
        localStorage.removeItem("tempURL");
        if (res.status === 200) {
            if (tempURL) {
                navigate(tempURL);
            } else {
                navigate("/")
            }
            toast("Đăng nhập thành công")
        } else {
            toast.error("Đăng nhập không thành công")
        }
    };
    return (
        <>
            <div id="login">
                <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                    <div className="form-container register-container">
                        <form>
                            <h1>Register here</h1>
                            <div className="form-control">
                                <input type="text" id="username" placeholder="Name"/>
                                <small id="username-error"/>
                            </div>
                            <div className="form-control">
                                <input type="email" id="email" placeholder="Email"/>
                                <small id="email-error"/>

                            </div>
                            <div className="form-control">
                                <input type="password" id="password" placeholder="Password"/>
                                <small id="password-error"/>

                            </div>
                            <button type="submit" value="submit">
                                Register
                            </button>
                            <span>or use your account</span>
                            <div className="social-container">
                                <a href="#" className="social">
                                    <i className="fa-brands fa-facebook-f"/>
                                </a>
                                <a href="#" className="social">
                                    <i className="fa-brands fa-google"/>
                                </a>
                                <a href="#" className="social">
                                    <i className="fa-brands fa-tiktok"/>
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="form-container login-container">
                        <Formik initialValues={initialValuesLogin}
                                onSubmit={(values) => handleLogin(values)}>
                            <Form className="form-lg">
                                <h1>Đăng nhập</h1>
                                <div className="form-control">
                                    <Field type="text" className="email-2" placeholder="Tên đăng nhập" name="userName"/>
                                    <small className="email-error-2"/>
                                </div>
                                <div className="form-control">
                                    <Field type="password" className="password-2" placeholder="Mật khẩu"
                                           name="password"/>
                                    <small className="password-error-2"/>
                                </div>
                                <div className="content">
                                    <div className="pass-link">
                                        <a href="#">Quên mật khẩu</a>
                                    </div>
                                </div>
                                <button type="submit" value="submit" className="m-0">
                                    Đăng nhập
                                </button>
                                <span>Hoặc</span>
                                <div className="social-container">
                                    <a href="#" className="social">
                                        <i className="fa-brands fa-facebook-f"/>
                                    </a>
                                    <a href="#" className="social">
                                        <i className="fa-brands fa-google"/>
                                    </a>
                                    <a href="#" className="social">
                                        <i className="fa-brands fa-tiktok"/>
                                    </a>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="title">
                                    Hello <br/>
                                    friends
                                </h1>
                                <p>If you have an account, login here and have fun</p>
                                <button className="ghost" id="login" onClick={handleLoginClick}>
                                    Login
                                    <i className="fa-solid fa-arrow-left"/>
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="title">
                                    Start your <br/>
                                    journey now
                                </h1>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>If you don't have an account yet, join us and start your journey</p>
                                <button className="ghost" id="register" onClick={handleRegisterClick}>
                                    Register
                                    <i className="fa-solid fa-arrow-right"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;