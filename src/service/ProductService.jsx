import axios from "axios";

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
