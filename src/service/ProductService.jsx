import axios from "axios";

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
