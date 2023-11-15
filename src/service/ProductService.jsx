import axios from "axios";

export const deleteProduct = async (idUser, idProduct) =>{
    const res = await axios.post(`http://localhost:8080/cart/delete/${idUser}/${idProduct}`)
    return res;
}


export const getAllCart = async (idUser) => {
    const res = await axios.get(`http://localhost:8080/cart/getAllCart/${idUser}`)
    return res;
};


export const addToCart = async (idProduct,userId) => {
    const res = await axios.post(`http://localhost:8080/cart/addToCart/${idProduct}/${userId}`)
    return res;
};


export const getAllSearchName =async (searchName, currentPage) => {
    const res = await axios.get(`http://localhost:8080/product/searchName?searchName=${searchName}&page=${currentPage}`)
    return res;
};


export const getAllNewProduct = async () => {
    const res = await axios.get("http://localhost:8080/product/listNewProduct")
    return res.data;
};


export const getBestSellers = async () => {
    const res = await axios.get("http://localhost:8080/product/listBestSeller")
    return res.data;
};


export const getAllCategories = async () => {
    const res = await axios.get("http://localhost:8080/product/categories")
    return res.data;
};
