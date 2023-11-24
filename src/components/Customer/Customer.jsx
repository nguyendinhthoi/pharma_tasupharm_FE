import React, {useContext, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {CartContext} from "../Context/Context.jsx";
import * as loginService from "../../service/LoginService.jsx"
import * as productService from "../../service/ProductService.jsx"

import * as Yup from 'yup';
import { differenceInYears, parse } from 'date-fns';
import XRegExp from "xregexp";
import {toast} from "react-toastify";
import {FaInfoCircle} from "react-icons/fa";



function Customer() {
    const {userId} = useContext(CartContext);
    const [customer, setCustomer] = useState({});
    const [isDisable, setIsDisable] = useState(true);
    const [isHistory, setIsHistory] = useState(false);
    const [history, setHistory] = useState([]);
    const [detailHistory, setDetailHistory] = useState([]);
    const [isHistoryDetail, setIsHistoryDetail] = useState(false);

    const getInfoCustomer =async () => {
        const res =await loginService.getCustomer(userId);
        if (res.status === 200){
            setCustomer(res.data)
        }
    };
    useEffect(() => {
        getInfoCustomer();
    }, [userId]);

    const editCustomer =async (value) => {
        const res =await loginService.editCustomer(value);
        if (res.status === 200){
            toast("Bạn đã cập nhật thành công")
            getInfoCustomer();
            setIsDisable(!isDisable)
        }else {
            toast("Bạn đã cập nhật thất bại")
        }
    };
    const initialValues = customer
        ? {
            id: customer.id,
            name: customer.name,
            phoneNumber: customer.phoneNumber,
            gender: customer.gender,
            address: customer.address,
            birthday: customer.birthday,
            email: customer.appUser && customer.appUser.email,
            userId: userId
        }
        : {
            id: "",
            name: "",
            phoneNumber: "",
            gender: 0,
            address: "",
            birthday: "",
            email: "",
            userId: userId
        };
    const validationSchema = {
        name: Yup.string().required("Vui lòng nhập tên")
            .max(100, "Vui lòng nhập dưới 100 kí tự")
            .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên nhân viên chỉ được chứa chữ cái và khoảng trắng")
            .min(3, "Tên khách hàng tối thiểu 3 ký tự").required("Không bỏ trống trường này").matches(XRegExp('^\\p{Lu}\\p{Ll}*([\\s]\\p{Lu}\\p{Ll}*)*$'), "Nhập sai định dạng vd: Nguyen Van An "),
        phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại")
            .min(10, "Vui lòng chỉ nhập từ 10 đến 11 số")
            .max(11, "Vui lòng chỉ nhập từ 10 đến 11 số")
            .matches(/^0\d{9,10}$/u, "Số điện thoại phải đúng định dạng 0XXXXXXXXX"),
        birthday: Yup.string().required("Vui lòng nhập ngày sinh")
            .test('age', 'Khách hàng chưa đủ 18 tuổi', function (value) {
                const currentDate = new Date();
                const selectedDate = parse(value, 'yyyy-MM-dd', new Date());
                const age = differenceInYears(currentDate, selectedDate);
                return age >= 18;
            }),
    }
    const unDisableInfo = () => {
        setIsDisable(!isDisable)
    };
    const getAllHistory =async () => {
        try {
            const res = await productService.getAllHistory(userId);
            if (res.status === 200){
                setHistory(res.data);
            }
        }catch (e){
            console.log("Lỗi lấy history")
        }
    };
    const unDisableHistory = () => {
        setIsHistory(!isHistory)
        getAllHistory();
    };
    const handleDetailHistory = async (id) => {
        setIsHistory(!isHistory)
        setIsHistoryDetail(!isHistoryDetail);
        const res = await productService.getDetailHistory(id);
        console.log(res)
        if (res.status === 200){
            setDetailHistory(res.data)
        }
    };
    const backToHistory = () => {
        setIsHistory(!isHistory)
        setIsHistoryDetail(!isHistoryDetail)
    };
    return (
        customer &&
        <>
            <Header/>
            <Formik initialValues={initialValues}
                    onSubmit={(value) => {
                        editCustomer(value)
                    }}
                    enableReinitialize
                    validationSchema={Yup.object(validationSchema)}
                    >
            <Form>
                    <div className="  d-flex justify-content-center my-5 pt-5">
                        <fieldset className="form-Field shadow mx-auto" style={{
                            borderRadius: '20px',
                            border: '1px solid black',
                            height: 'auto',
                            width: '80%'
                        }}>
                            <legend><h3 style={{ margin: '2%' }}>Thông tin cá nhân</h3></legend>
                            <div style={{ marginBottom: '5%' }}>
                                <fieldset className="form-Field shadow mx-auto" style={{
                                    borderRadius: '20px',
                                    border: '1px solid black',
                                    height: 'auto',
                                    width: '80%',
                                    padding: '20px'
                                }}>
                                    <legend className="float-none w-auto px-1">Thông tin khách hàng</legend>
                                        <div>
                                            <div className="row p-2 mx-auto" style={{ width: '90%' }}>
                                                <div className="col-4 p-2">
                                                    <label>Tên khách hàng <sup style={{ color: "red" }}>*</sup></label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <Field
                                                        className="form-control mt-2 border border-dark"
                                                        name="name"
                                                        type="text"
                                                        disabled={isDisable}
                                                    />
                                                        <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                                                            <ErrorMessage
                                                                className="text-danger"
                                                                name="name"
                                                                component="small"
                                                            />
                                                        </div>
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Số điện thoại <sup style={{ color: "red" }}>*</sup></label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <Field
                                                        name="phoneNumber"
                                                        className="form-control mt-2 border border-dark"
                                                        type="text"
                                                        disabled={isDisable}
                                                    />
                                                    <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                                                        <ErrorMessage
                                                            className="text-danger"
                                                            name="phoneNumber"
                                                            component="small"
                                                        />
                                                    </div>
                                                </div>
                                                <Field name="idUser" type="hidden" value={userId} />
                                                <div className="col-4 p-2">
                                                    <label>Giới tính <sup style={{ color: "red" }}>*</sup></label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <Field
                                                        as="select"
                                                        className="form-control mt-2 border border-dark"
                                                        name="gender"
                                                        type="text"
                                                        disabled={isDisable}
                                                    >
                                                    <option value={0}>Nam</option>
                                                    <option value={1}>Nữ</option>
                                                    </Field>
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Địa chỉ <sup style={{ color: "red" }}>*</sup></label>
                                                </div>

                                                <div className="col-8 mb-2">
                                                    <Field
                                                        name="address"
                                                        className="form-control mt-2 border border-dark"
                                                        type="text"
                                                        disabled={isDisable}

                                                    />
                                                        <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                                                            <ErrorMessage
                                                                className="text-danger"
                                                                name="address"
                                                                component="small"
                                                            />
                                                        </div>
                                                    
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Ngày sinh <sup style={{ color: "red" }}>*</sup></label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <Field
                                                        name="birthday"
                                                        className="form-control mt-2 border border-dark"
                                                        type="date"
                                                        disabled={isDisable}

                                                    />
                                                        <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                                                            <ErrorMessage
                                                                className="text-danger"
                                                                name="birthday"
                                                                component="small"
                                                            />
                                                        </div>
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Email <sup style={{ color: "red" }}>*</sup></label>
                                                </div>
                                                <div className="col-8 mb-2">
                                                    <Field
                                                        name="email"
                                                        className="form-control mt-2 border border-dark"
                                                        type="email"
                                                        disabled
                                                    />
                                                    <div style={{ height: "0.6rem", marginBottom: "0.6rem" }}>
                                                        <ErrorMessage
                                                            className="text-danger"
                                                            name="email"
                                                            component="small"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="d-flex justify-content-center">
                                            <button type="button" onClick={unDisableInfo}
                                                    className="btn btn-outline-primary col-6 d-flex justify-content-center my-3"
                                                    style={{ width: '30%', margin: '15px' }}>
                                                {isDisable ? "Chỉnh sửa thông tin" : "Trở lại" }
                                            </button>

                                        {!isDisable &&
                                            <button type="submit"
                                                    className="btn btn-outline-primary col-6 d-flex justify-content-center my-3"
                                                    style={{ width: '30%', margin: '15px' }}>
                                                Xác nhận
                                            </button>
                                        }
                                        {isDisable &&
                                            <button type="button" onClick={unDisableHistory}
                                                    className="btn btn-outline-primary col-6 d-flex justify-content-center my-3"
                                                    style={{ width: '30%', margin: '15px' }}>
                                                Lịch sử mua hàng
                                            </button>
                                        }
                                    </div>
                                </fieldset>
                                {
                                    isHistory &&
                                    <div style={{ marginBottom: '5%' }}>
                                        <fieldset className="form-input shadow mx-auto" style={{
                                            borderRadius: '20px',
                                            border: '1px solid black',
                                            height: 'auto',
                                            width: '80%',
                                            padding: '20px'
                                        }}>
                                            <legend className="float-none w-auto px-1">Lịch sử mua hàng</legend>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-container"
                                                         style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                        <table className="table" style={{ width: '100%' }}>
                                                            <thead>
                                                            <tr>
                                                                <th className="col-1 text-center">#</th>
                                                                <th className="col-3 text-center">Đơn hàng</th>
                                                                <th className="col-2 text-center">Ngày mua</th>
                                                                <th className="col-2 text-center">Giờ mua</th>
                                                                <th className="col-2 text-center">Tổng tiền</th>
                                                                <th className="col-1 text-center" style={{ width: "100%" }}>Thao
                                                                    tác
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {history ?
                                                                (
                                                                    history.map((history, index) => (
                                                                        <tr key={index}>
                                                                            <td className="col-1 text-center">{index + 1}</td>
                                                                            <td className="col-3 text-center ellipsis" title={history.infoBuy}>{history.infoBuy}</td>
                                                                            <td className="col-2 text-center">{history.dateOfOrder}</td>
                                                                            <td className="col-2 text-center">{history.timeOfOrder}</td>
                                                                            <td className="col-2 text-center">
                                                                                {history.totalMoney.toLocaleString('vi-VN', {
                                                                                    style: 'currency',
                                                                                    currency: 'VND'
                                                                                })}
                                                                            </td>
                                                                            <td className="col-2 text-center">
                                                                                <button
                                                                                    className="btn btn-info"
                                                                                    type="button"
                                                                                    onClick={() => handleDetailHistory(history.id)}
                                                                                >
                                                                                    <FaInfoCircle color="white"/>                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ):(
                                                                    <tr>
                                                                        <td className="text-center" colSpan="6">
                                                                            <b>----Trống----</b>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                }
                                {
                                    isHistoryDetail &&
                                    <div style={{ marginBottom: '5%' }}>
                                        <fieldset className="form-input shadow mx-auto" style={{
                                            borderRadius: '20px',
                                            border: '1px solid black',
                                            height: 'auto',
                                            width: '80%',
                                            padding: '20px'
                                        }}>
                                            <legend className="float-none w-auto px-1">Chi tiết đơn hàng</legend>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-container"
                                                         style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table className="table " style={{ width: '100%' }}>
                                        <thead>
                                        <tr>
                                            <th className="col-1 text-center">#</th>
                                            <th className="col-3 text-center">Tên sản phẩm</th>
                                            <th className="col-2 text-center">Số lượng</th>
                                            <th className="col-2 text-center">Gía tiền</th>
                                            <th className="col-2 text-center">Đơn giá</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {detailHistory &&
                                            detailHistory.map((detail, index) => (
                                                    <tr key={index}>
                                                        <td className="col-1 text-center">{index + 1}</td>
                                                        <td className="col-3 text-center" title={detail.name}>{detail.name}</td>
                                                        <td className="col-2 text-center">{detail.quantity}</td>

                                                        <td className="col-2 text-center">
                                                            {detail.priceOrder.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}
                                                        </td>
                                                        <td className="col-2 text-center">{(detail.priceOrder * detail.quantity).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</td>
                                                    </tr>
                                                )
                                            )
                                        }

                                        </tbody>
                                    </table>
                                                    </div>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <button className="btn btn-outline-primary d-flex justify-content-center mx-auto" onClick={backToHistory}>
                                                        Quay lại lịch sử bán hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                }

                            </div>
                        </fieldset>
                    </div>
                </Form>
            </Formik>
            <Footer/>

        </>
    );
}

export default Customer;