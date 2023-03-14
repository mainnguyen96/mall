import classNames from "classnames/bind";

import Button from "~/components/Button";
import styles from "./Bill.module.css";

const cx = classNames.bind(styles);

function Bill({ totalPrice, shippingPrice, onBuyClick }) {
  const price = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice);
  const shippingCost = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(shippingPrice);
  const total = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(+totalPrice + +shippingPrice);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("cost")}>
        <div className={cx("price")}>
          <p className={cx("price-label")}>Provisional</p>
          <p className={cx("price-number")}>{price}</p>
        </div>
        {shippingPrice && (
          <div className={cx("price")}>
            <p className={cx("price-label")}>Shipping Cost</p>
            <p className={cx("price-number")}>{shippingCost}</p>
          </div>
        )}
        <div className={cx("total")}>
          <p className={cx("total-label")}>Total amount</p>
          <p className={cx("total-number")}>
            {shippingPrice ? total : price}
          </p>
        </div>
        <div className={cx("vat")}>(VAT included)</div>
      </div>
      <div className={cx("purchase")}>
        <Button onClick={onBuyClick} label={"Purchase"} />
      </div>
    </div>
  );
}

export default Bill;
