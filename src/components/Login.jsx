import React from 'react';
import "../css/login.css"
function Login() {
    return (
        <>
            <div id="login">
                <div className="container" id="container">
                    <div className="form-container register-container">
                        <form>
                            <h1>Register here</h1>
                            <div className="form-control">
                                <input type="text" id="username" placeholder="Name" />
                                <small id="username-error" />
                                <span />
                            </div>
                            <div className="form-control">
                                <input type="email" id="email" placeholder="Email" />
                                <small id="email-error" />
                                <span />
                            </div>
                            <div className="form-control">
                                <input type="password" id="password" placeholder="Password" />
                                <small id="password-error" />
                                <span />
                            </div>
                            <button type="submit" value="submit">
                                Register
                            </button>
                            <span>or use your account</span>
                            <div className="social-container">
                                <a href="#" className="social">
                                    <i className="fa-brands fa-facebook-f" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fa-brands fa-google" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fa-brands fa-tiktok" />
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="form-container login-container">
                        <form className="form-lg">
                            <h1>Login here.</h1>
                            <div className="form-control2">
                                <input type="email" className="email-2" placeholder="Email" />
                                <small className="email-error-2" />
                                <span />
                            </div>
                            <div className="form-control2">
                                <input type="password" className="password-2" placeholder="Password" />
                                <small className="password-error-2" />
                                <span />
                            </div>
                            <div className="content">
                                <div className="checkbox">
                                    <input type="checkbox" name="checkbox" id="checkbox" />
                                    <label htmlFor="">Remember me</label>
                                </div>
                                <div className="pass-link">
                                    <a href="#">Forgot password</a>
                                </div>
                            </div>
                            <button type="submit" value="submit">
                                Login
                            </button>
                            <span>Or use your account</span>
                            <div className="social-container">
                                <a href="#" className="social">
                                    <i className="fa-brands fa-facebook-f" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fa-brands fa-google" />
                                </a>
                                <a href="#" className="social">
                                    <i className="fa-brands fa-tiktok" />
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="title">
                                    Hello <br />
                                    friends
                                </h1>
                                <p>If you have an account, login here and have fun</p>
                                <button className="ghost" id="login">
                                    Login
                                    <i className="fa-solid fa-arrow-left" />
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="title">
                                    Start your <br />
                                    journey now
                                </h1>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>If you don't have an account yet, join us and start your journey</p>
                                <button className="ghost" id="register">
                                    Register
                                    <i className="fa-solid fa-arrow-right" />
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