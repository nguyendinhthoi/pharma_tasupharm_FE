import axios from "axios";

export const getDetailHistory =async (id) => {
    const res = await axios.get(`http://localhost:8080/order/detailHistory/${id}`)
    return res;
};


export const getAllHistory =async (userId) => {
    const res = await axios.get(`http://localhost:8080/order/history/${userId}`)
    return res;
};


export async function getAllProduct(currentPage, value, choose) {
    const res = await axios.get(`http://localhost:8080/product/shop?page=${currentPage}&value=${value}&choosePrice=${choose}`)
    return res;
}


export const getAllProductByCategory =async (idCategory, currentPage,value,choose) => {
    console.log(value)
    console.log(choose)
    const res = await axios.get(`http://localhost:8080/product/category/${idCategory}?page=${currentPage}&value=${value}&choosePrice=${choose}`)
    return res;
};


export const getProductByCategory =async (id) => {
    const res = await axios.get(`http://localhost:8080/product/categoryByProduct/${id}`)
    return res;
};


export const getProduct = async (idProduct) => {
    const res = await axios.get(`http://localhost:8080/product/detail/${idProduct}`)
    return res;
};


export const confirmOrder = async (userId) => {
    try {
        const res = await axios.post(`http://localhost:8080/order/payment/${userId}`)
        return res;
    }catch (e){
        console.log("Lỗi tạo order")
    }
};


export const updateQuantity =async (idUser, idProduct, newQuantity) => {
    try {
        const res = await axios.post(`http://localhost:8080/cart/updateQuantity/${idUser}/${idProduct}/?quantity=${newQuantity}`)
        return res;
    }catch (e){
        console.log("Lỗi số lượng")
    }
};


export const deleteProduct = async (idUser, idProduct) =>{
    try {
        const res = await axios.post(`http://localhost:8080/cart/delete/${idUser}/${idProduct}`)
        return res;
    }catch (e){
        console.log("Lỗi xóa")
    }
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
