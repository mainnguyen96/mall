import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  startAt,
  endAt,
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

export const firebaseDB = getDatabase(app);
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
    endAt(filterValue )
  );

  let snapshot = await get(queryStart)
  if (snapshot.val()) {
    returnData = snapshot.val()
  } else {
    snapshot = await get(queryMiddle)
    returnData = snapshot.val()
  }

  return Object.values(returnData)
};
