import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { selectAuth } from "~/features/authSlice";
import TemplePage from "../TemplePage";
import Bill from "~/components/Cart/Bill";
import Location from "~/components/Location";
import Promotion from "~/components/Promotion";
import { routes } from "~/config/routes";
import CartInfo from "~/components/Cart/CartInfo";
import styles from "./Cart.module.css";

const cx = classNames.bind(styles);

function Cart() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.auth) {
      navigate(routes.home);
    }
  });
  return (
    <TemplePage showSidebar={false}>
      <div className={cx("wrapper")}>
        <h2 className={cx("header")}>Products Cart</h2>
        <div className={cx("content")}>
          <CartInfo />
          <div className={cx("billing")}>
            <Location />
            <Promotion />
            <Bill />
          </div>
        </div>
      </div>
    </TemplePage>
  );
}

export default Cart;
