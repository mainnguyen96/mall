import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import AccountPage from "../AccountPage";
import styles from "./Order.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency } from "~/ultil";
import CheckoutProduct from "~/pages/Checkout/CheckoutProduct";
import { useNavigate } from "react-router-dom";
import { fetchPurchases, selectPurchases } from "~/features/purchasesSlice";

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
  const purchases = useSelector(selectPurchases);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPurchases());
  }, [dispatch]);
  const handleClickMenu = (index) => {
    const selectData = [0, 0, 0, 0, 0, 0];
    selectData[index] = 1;
    setSelect(selectData);
  };
  const handleClickDetail = (purchaseId) => {
    navigate("/user/order-detail", {
      state: { purchaseId },
    });
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
        <ul className={cx("order-list")}>
          {purchases?.map((purchase, index) => (
            <li key={index} className={cx("orders")}>
              <div className={cx("order-status")}>
                <FontAwesomeIcon icon={faTruck} />
                <label>Delivery successful</label>
              </div>
              {purchase.products?.map(([productId, count], index) => (
                <CheckoutProduct
                  count={count}
                  key={index}
                  productId={productId}
                />
              ))}
              <div className={cx("order-detail")}>
                <p className={cx("order-total")}>
                  Total: {convertCurrency(purchase.total)}
                </p>
                <div className={cx("order-menu")}>
                  <Button
                    size={"small"}
                    styles={"outline"}
                    label={"Repurchase"}
                  />
                  <Button
                    onClick={() => handleClickDetail(purchase.id)}
                    size={"small"}
                    styles={"outline"}
                    label={"Details"}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AccountPage>
  );
}

export default Order;
