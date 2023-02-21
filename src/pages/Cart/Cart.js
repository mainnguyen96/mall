import classNames from "classnames/bind";
import Bill from "~/components/Cart/Bill";
import CartInfo from "~/components/Cart/CartInfo";
import Location from "~/components/Location";
import Promotion from "~/components/Promotion";
import TemplePage from "../TemplePage";

import styles from "./Cart.module.css";

const cx = classNames.bind(styles);

function Cart() {
  return (
    <TemplePage showSidebar={false}>
      <div className={cx("wrapper")}>
        <h2 className={cx("header")}>Products Cart</h2>
        <div className={cx("content")}>
          <CartInfo />
          <div className={cx("billing")}>
            <Location/>
            <Promotion/>
            <Bill/>
          </div>
        </div>
      </div>
    </TemplePage>
  );
}

export default Cart;
