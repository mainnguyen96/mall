// import { createAsyncThunk } from "@reduxjs/toolkit"
// import { getData } from "~/firebaseServices"

// const initState = {
//     userData: null
// }

// export const fetchUserData = createAsyncThunk(
//     "users/fetchUserData",
//     async (_, {getState}) => {
//         const userId = getState().auth.userId
//         getData("users/" + userId).then((data) => {
//             console.log("data:", data);
//             if (data) {
//               const userData = {
//                 email: data.email,
//                 phone: data.phone,
//                 birthDay: data.birthDay,
//                 birthMonth: data.birthMonth,
//                 birthYear: data.birthYear,
//                 sex: data.sex,
//               };
//               setUserData(userData);
//               handleChangeDay(data.birthYear, data.birthMonth);
//             }
//           });
//     }
// )