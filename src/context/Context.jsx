// import React, {createContext, useEffect, useState} from 'react';
// import * as loginService from "../service/LoginService.jsx";
//
// const Cart = createContext();
//
//
// function Context({children}) {
//     const [userId, setUserId] = useState("");
//     const [userName, setUserName] = useState("");
//
//     const getUserId = async () => {
//         const jwtToken = loginService.getJwtToken();
//         console.log(jwtToken)
//         const user = await loginService.getUser(jwtToken.sub)
//         console.log(user)
//         setUserId(user.id);
//         try {
//             const res = await loginService.getCustomer(user.id);
//             console.log(res)
//             if (res.status === 200) {
//                 setUserName(res.data.name);
//             }
//         } catch (e) {
//             setUserName("Khách vãng lai");
//         }
//     };
//     useEffect(() => {
//         getUserId();
//     }, []);
//
//     return (
//         <>
//             <Cart.Provider value={{userId,userName}}></Cart.Provider>
//         </>
//     );
// }
//
// export default Context;