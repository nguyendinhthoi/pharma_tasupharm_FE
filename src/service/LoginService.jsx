import axios from "axios";

export const addJwtTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("JWT",jwtToken);
};


export const login = async (values) => {
    const res = await axios.post("http://localhost:8080/user/login",values)
    return res;
};
