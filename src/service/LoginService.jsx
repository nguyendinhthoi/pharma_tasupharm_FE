import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const register = async (values) => {
    const res = await axios.post("http://localhost:8080/user/register", values);
    console.log(res)
    return res;
};


export const getCustomer = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/user/getCustomer/${idUser}`)
    return res;
};


export const getUserId = async (sub) => {
    const res = await axios.get(`http://localhost:8080/user/getUser/${sub}`)
    return res.data;
};


export const getJwtToken = () => {
    const jwtToken = localStorage.getItem("JWT");
    if (jwtToken) {
        return jwtDecode(jwtToken)
    }
    return null;
};


export const addJwtTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("JWT", jwtToken);
};


export const login = async (values) => {
    const res = await axios.post("http://localhost:8080/user/login", values)
    return res;
};
