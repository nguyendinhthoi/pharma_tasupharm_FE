import {createContext, useEffect, useReducer, useState} from "react";
import * as loginService from "../service/LoginService.jsx";
import * as productService from "../service/ProductService.jsx";


export const CartContext = createContext({});
const cartReducer = (state,action) => {
    const getIntoCart = async (idUser, idProduct) => {
            await productService.addToCart(idProduct,idUser)
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
            const existingItem = state.cartItem.find(item => item.idProduct === action.payload.idProduct);
            if (existingItem) {
                return state;
            }
            getIntoCart(action.payload.idUser,action.payload.idProduct);
            return {
                ...state,
                cartItem : [...state.cartItem,action.payload]
            };
        case 'REMOVE_FROM_CART':
            removeFromCart(action.payload.idUser,action.payload.idProduct)
            return {
                ...state,
                cartItem : state.cartItem.filter(item => item.idProduct !== action.payload.idProduct)
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

    const getUserId =async () => {
        const jwtToken = loginService.getJwtToken();
            const user = await loginService.getUser(jwtToken.sub);
            setUserId(user.id);
    };
    useEffect(() => {
        getUserId();
    }, [cartReducer]);

    return <CartContext.Provider value={{cartState,dispatch,userId}}>
        {children}
    </CartContext.Provider>
}