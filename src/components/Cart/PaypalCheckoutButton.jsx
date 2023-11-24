import {PayPalButtons} from "@paypal/react-paypal-js";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../Context/Context.jsx";
import * as productService from "../../service/ProductService.jsx"
import Swal from "sweetalert2";
import * as loginService from "../../service/LoginService.jsx"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const PaypalCheckoutButton = () => {
    const cartContext = useContext(CartContext);
    const {cartState,userId ,dispatch,isRender, setIsRender} = cartContext;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    console.log(cartState)
    const getCustomer =async () => {
        const res =await loginService.getCustomer(userId);
        if (res.data.name === "Khách hàng"){
            navigate("/info")
            toast("Bạn cần phải cập nhật thông tin khách hàng trước khi thanh toán")
        }
    };
    useEffect(() => {
        getCustomer();
    }, []);

    const handleApprove = async () => {
        try {
           const res = await productService.confirmOrder(userId);
            if (res.status === 200){
                dispatch({
                    type:"SET_CART",
                    payload: {
                        carts : []
                    }
                })
                setIsRender(!isRender)
                await Swal.fire({
                    icon: 'success',
                    title: 'Thanh toán thành công!',
                    text: 'Cảm ơn bạn đã mua sắm!',
                    confirmButtonText: 'OK',
                    showCancelButton: false,
                    showCloseButton: false,
                });
            }else {
            setPaidFor(true);
        }
        }catch (e){
            console.log("lỗi paypal")
        }
    };

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        alert("Thank you for your purchase!");
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }

    return (
        cartState.cartItem.length > 0 &&
        <PayPalButtons
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}
            onClick={(data, actions) => {
                // Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                    setError(
                        "You already bought this course. Go to your account to view your list of courses."
                    );

                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: (cartState.cartItem.reduce((total, item) => total + item.quantity * item.price, 0) / 23000).toFixed(2),
                            },
                        }
                    ]
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order);
                handleApprove();
            }}
            onError={(err) => {
                setError(err);
                console.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to cart
            }}
        />
    );
};

export default PaypalCheckoutButton;