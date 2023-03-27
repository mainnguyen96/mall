import { nanoid } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  startAt,
  endAt,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEANnoM6n0o2Yowvhao5gmLtDuGNSW4YE",
  authDomain: "mall-eb5e9.firebaseapp.com",
  databaseURL:
    "https://mall-eb5e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mall-eb5e9",
  storageBucket: "mall-eb5e9.appspot.com",
  messagingSenderId: "339679751001",
  appId: "1:339679751001:web:1f5c4acce48f3714a77a48",
  measurementId: "G-9X0E9QMN3W",
};

const app = initializeApp(firebaseConfig);

const firebaseDB = getDatabase(app);

export const getData = async (path, child, filterValue) => {
  let queryData;

  if (child) {
    queryData = query(
      ref(firebaseDB, path),
      orderByChild(child),
      equalTo(filterValue)
    );
  } else {
    queryData = ref(firebaseDB, path);
  }

  const snapshot = await get(queryData);
  const data = snapshot.val();
  return data;
};

export const searchData = async (path, child, filterValue) => {
  let returnData = {};
  const queryStart = query(
    ref(firebaseDB, path),
    orderByChild(child),
    startAt(filterValue),
    endAt(filterValue + "\uf8ff")
  );

  const queryMiddle = query(
    ref(firebaseDB, path),
    orderByChild(child),
    startAt(`%${filterValue}%`),
    endAt(filterValue)
  );

  let snapshot = await get(queryStart);
  if (snapshot.val()) {
    returnData = snapshot.val();
  } else {
    snapshot = await get(queryMiddle);
    returnData = snapshot.val();
  }

  return Object.values(returnData);
};

export const setUserData = (userId, name, email, imageUrl) => {
  set(ref(firebaseDB, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
};

export const updateUserData = (userId, path, dataId, data) => {
  const updates = {};
  updates[`users/${userId}/${path}${dataId ? "/" + dataId : ""}`] = data;
  update(ref(firebaseDB), updates);
};

export const updateCartData = async (userId, productId, count) => {
  const updates = {};
  updates["carts/" + userId + "/" + productId] = {
    count: count,
    time: new Date(),
  };
  update(ref(firebaseDB), updates);
};

export const deleteCartData = async (userId, productId) => {
  remove(ref(firebaseDB, "carts/" + userId + "/" + productId));
};

export const getCartData = async (userId) => {
  onValue(ref(firebaseDB, "carts/" + userId), (snapshot) => {
    const data = snapshot.val();
    console.log("carts:", data);
    return data;
  });
};

export const updatePurchaseData = async (userId, purchaseId, data) => {
  const updates = {};
  updates["purchases/" + userId + "/" + purchaseId] = { ...data };
  update(ref(firebaseDB), updates);
};

export const updateReview = async (userId, productId, data) => {
  const updates = {};
  const reviewId = nanoid();
  const time = new Date();
  updates["reviews/" + productId + "/" + userId + "/" + reviewId] = {
    ...data,
    time,
  };
  update(ref(firebaseDB), updates);
};

export const emailSignup = async (auth, email, password) => {
  let user;
  let error;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((err) => {
      error = err;
    });
  if (error) {
    throw error.code;
  }
  return user;
};

export const emailLogin = async (auth, email, password) => {
  let user;
  let error;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
    })
    .catch((err) => {
      error = err;
    });
  if (error) {
    throw error.code;
  }
  return user;
};

export { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged };
