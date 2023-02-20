import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductInfo.module.css";
import Button from "../../Button";
import ImageShow from "./ImageShow";
import Ship from "./Ship";

const cx = classNames.bind(styles);

function ProductInfo({ name, brand, review, sold, price, imgs }) {
  const [quantity, setQuantity] = useState(0);
  const currency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
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
      <div className={cx("images")}>
        <ImageShow imgs={imgs}/>
      </div>
      <div className={cx("info")}>
        <h3 className={cx("brand")}>Brand: {brand}</h3>
        <h3 className={cx("name")}>
          {name}
        </h3>
        <div className={cx("more")}>
          <div className={cx("rating")}>
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
          </div>
          <p className={cx("review")}>(See {review} reivews)</p>
          <p className={cx("sold")}>Sold {sold}</p>
        </div>
        <div className={cx("body")}>
          <div className={cx("price")}>{currency}</div>
          <Ship />
          <div className={cx("quantity")}>
            Quantity
            <div className={cx("quantity-set")}>
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
          </div>
          <div className={cx("button")}>
            <Button label={"Buy"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
