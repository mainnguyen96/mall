import { useState } from "react";
import { useField, Field } from "formik";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./CartProduct.module.css";

const cx = classNames.bind(styles);

function CartProduct({ ...props }) {
  const [quantity, setQuantity] = useState(1);
  const [field, meta] = useField(props);
  const handleSetQuantity = (action) => {
    if (action === "add") {
      setQuantity((prev) => {
        return prev + 1;
      });
    } else {
      setQuantity((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Field {...field} {...props} type="checkbox" className={cx("checkbox")} />
      <div className={cx("product")}>
        <img
          className={cx("product-img")}
          src="https://salt.tikicdn.com/cache/w78/ts/product/e2/1a/80/ebd11992c962a5e63d0b148b78cfee9d.png.webp"
          alt="product"
        />
        <p className={cx("product-name")}>
          Samsung Galaxy Z Flip 4 (8GB/128GB)
        </p>
      </div>
      <h4 className={cx("price")}>179999999</h4>
      <div className={cx("quantity")}>
        <FontAwesomeIcon
          onClick={() => handleSetQuantity("sub")}
          className={cx("quantity-icon")}
          icon={faMinus}
        />
        <label className={cx("quantity-label")}>{quantity}</label>
        <FontAwesomeIcon
          onClick={() => handleSetQuantity("add")}
          className={cx("quantity-icon")}
          icon={faPlus}
        />
      </div>
      <h4 className={cx("money")}>179999999</h4>
      <FontAwesomeIcon icon={faTrashCan} className={cx("icon")} />
    </div>
  );
}

export default CartProduct;
