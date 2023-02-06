import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductInfo.module.css";
import Button from "../Button";
import ImageShow from "./ImageShow";
import Ship from "./Ship";

const cx = classNames.bind(styles);

function ProductInfo() {
  const [quantity, setQuantity] = useState(0);
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
        return 0
      });
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("images")}>
        <ImageShow />
      </div>
      <div className={cx("info")}>
        <h3 className={cx("brand")}>Brand: Samsung</h3>
        <h3 className={cx("name")}>
          Samsung Galaxy A33 5G phone (6GB/128GB) - Genuine product
        </h3>
        <div className={cx("more")}>
          <div className={cx("rating")}>
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
          </div>
          <p className={cx("review")}>(See 5 reivews)</p>
          <p className={cx("sold")}>Sold 15</p>
        </div>
        <div className={cx("body")}>
          <div className={cx("price")}>1000000</div>
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
