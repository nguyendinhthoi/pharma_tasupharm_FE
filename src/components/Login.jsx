import React, {useState} from 'react';
import "../css/login.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as loginService from "../service/LoginService.jsx"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as Yup from "yup";

function Login() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate();
    const [initialValuesLogin, setInitialValuesLogin] = useState(
        {
            userName: "",
            password: ""
        });

    const handleRegisterClick = () => {
        setIsRightPanelActive(true);
    };

    const handleLoginClick = () => {
        setIsRightPanelActive(false);
    };



    const initialValuesRegister = {
        userName: "",
        password: "",
        confirmPassword: "",
        email: ""
    }
    const validationSchema = {
        userName: Yup.string()
            .required("Không để trống tên tài khoản!")
            .test('check-userName', 'Không để trống tên tài khoản!', (value) => value.trim().length !== 0)
            .min(3, "Tên đăng nhập phải lớn hơn hoặc bằng 3 ký tự!")
            .max(50, "Tên đăng nhập phải ít hơn hoặc bằng 50 ký tự!"),
        password: Yup.string()
            .required("Không được để trống mật khẩu!")
            .test('check-userName', "Không để trống mật khẩu!", (value) => value.trim().length !== 0)
            .min(3, "Mật khẩu ít nhất 3 ký tự!")
            .max(50, "Mật khẩu phải ít hơn hoặc bằng 50 ký tự!"),
        confirmPassword: Yup.string()
            .required("Không được để trống mật khẩu!")
            .test('check-userName', "Không để trống mật khẩu", (value) => value.trim().length !== 0)
            .min(3, "Mật khẩu ít nhất 3 ký tự!")
            .max(50, "Mật khẩu ít hơn hoặc bằng 50 ký tự!")
            .oneOf([Yup.ref('password'), null], "Mật khẩu không trùng khớp!"),
        email: Yup.string()
            .required("Vui lòng nhập email.")
    }

    const handleLogin = async (values) => {
        try {
            const res = await loginService.login(values);
            console.log(res)
            loginService.addJwtTokenToLocalStorage(res.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            console.log(tempURL)
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
        } catch (e) {
            toast.error("Tên đăng nhập hoặc mật khẩu không đúng")
        }
    };

    const handleRegister = async (values) => {
        try {
            console.log(values)
            const res = await loginService.register(values);
            console.log(res)
            if (res.status === 202) {
                toast("Bạn đã tạo mới tài khoản thành công");
                console.log(res.data.userName)
                setIsRightPanelActive(false);
                setInitialValuesLogin({
                    ...initialValuesLogin,
                    userName: res.data.userName
                })
            } else if (res.status === 200) {
                toast.error(res.data);
            }
        } catch (e) {
            toast.error("Tạo tài khoản thất bại");
        }

    };
    return (
        <>
            <div id="login">
                <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                    <div className="form-container register-container">
                        <Formik initialValues={initialValuesRegister}
                                onSubmit={(values) => handleRegister(values)}
                                validationSchema={Yup.object(validationSchema)}>
                            <Form>
                                <h1>Đăng kí</h1>
                                <div className="form-control">
                                    <Field type="text" id="username" placeholder="Tên đăng nhập" name="userName"/>
                                    <ErrorMessage name="userName" component="small" className="text-danger"/>
                                </div>
                                <div className="form-control">
                                    <Field type="password" id="password" placeholder="Mật khẩu" name="password"/>
                                    <ErrorMessage name="password" component="small" className="text-danger"/>
                                </div>
                                <div className="form-control">
                                    <Field type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu"
                                           name="confirmPassword"/>
                                    <ErrorMessage name="confirmPassword" component="small" className="text-danger"/>
                                </div>
                                <div className="form-control">
                                    <Field type="email" id="email" placeholder="Email" name="email"/>
                                    <ErrorMessage name="email" component="small" className="text-danger"/>
                                </div>
                                <button type="submit" value="submit">
                                    Đăng kí
                                </button>
                            </Form>
                        </Formik>
                    </div>
                    <div className="form-container login-container">
                        <Formik initialValues={initialValuesLogin}
                                onSubmit={(values) => handleLogin(values)}
                                enableReinitialize>
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