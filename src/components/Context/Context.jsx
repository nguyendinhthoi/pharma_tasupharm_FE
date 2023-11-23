import {createContext, useEffect, useReducer, useState} from "react";
import * as loginService from "../../service/LoginService.jsx";
import * as productService from "../../service/ProductService.jsx";
import {toast} from "react-toastify";


export const CartContext = createContext({});
const cartReducer = (state,action) => {
    const getIntoCart = async (idUser, idProduct) => {
        try {
           await productService.addToCart(idProduct,idUser);
           toast("Bạn đã thêm mới sản phẩm thành công")
        }catch (e){
            toast("Sản phẩm đã có trong giỏ hàng")
        }
    };
    const removeFromCart = async (idUser,idProduct) => {
        await productService.deleteProduct(idUser,idProduct)
    };
    const updateQuantity = async (idUser, idProduct, newQuantity) => {
        await productService.updateQuantity(idUser,idProduct,newQuantity);
    };
    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                cartItem : action.payload.carts
            };
        case 'ADD_TO_CART':
            getIntoCart(action.payload.idUser,action.payload.item.id);
            const existingItem = state.cartItem.find(item => (item.idProduct ? item.idProduct : item.id) === action.payload.item.id);
            if (existingItem) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                cartItem : [action.payload.item,...state.cartItem],
            };
        case 'REMOVE_FROM_CART':
            removeFromCart(action.payload.idUser,action.payload.idProduct)
            return {
                ...state,
                cartItem : state.cartItem.filter(item => (item.idProduct ? item.idProduct : item.id) !== action.payload.idProduct)
            }
        case 'UPDATE_QUANTITY':
            updateQuantity(action.payload.idUser,action.payload.idProduct,action.payload.newQuantity)
            return {
                ...state,
                cartItem : state.cartItem.map((item) => item.idProduct === action.payload.idProduct
                    ? {...item,quantity:action.payload.newQuantity} : item)
            }
        default :
            return state;
    }
}

export const CartProvider = ({children}) => {
    const [ cartState,dispatch ] = useReducer(cartReducer,{cartItem :[]});
    const [userId, setUserId] = useState("");
    const [isRender, setIsRender] = useState(false);


    const getCartUser =async (id) => {
        const res = await productService.getAllCart(id);
        dispatch({
            type: 'SET_CART',
            payload :
                {
                    carts : res.data
                }
        })
    };
    const getUserId =async () => {
        const jwtToken = loginService.getJwtToken();
        console.log(jwtToken)
        const user = await loginService.getUser(jwtToken.sub);
        setUserId(user.id);
        getCartUser(user.id)
    };

    useEffect(() => {
        getUserId();
    }, [cartReducer]);

    return <CartContext.Provider value={{cartState,dispatch,userId,setUserId,isRender,setIsRender}}>
        {children}
    </CartContext.Provider>
}