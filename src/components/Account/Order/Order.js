import { useState } from "react";
import classNames from "classnames/bind";

import AccountPage from "../AccountPage";
import styles from "./Order.module.css";

const cx = classNames.bind(styles);
const orderList = [
  "All orders",
  "Wait for pay",
  "Processing",
  "Being transported",
  "Delivered",
  "Canceled",
];

function Order() {
  const [select, setSelect] = useState([1, 0, 0, 0, 0, 0]);
  const handleClickMenu = (index) => {
    const selectData = [0, 0, 0, 0, 0, 0];
    selectData[index] = 1;
    setSelect(selectData);
  };
  return (
    <AccountPage header={"My orders"}>
      <div className={cx("wrapper")}>
        <ul className={cx("menu")}>
          {orderList.map((item, index) => (
            <li
              onClick={() => handleClickMenu(index)}
              key={index}
              className={cx("menu-item", select[index] === 1 && "active")}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </AccountPage>
  );
}

export default Order;
