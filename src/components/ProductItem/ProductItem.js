import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductItem.module.css";

const cx = classNames.bind(styles);

function ProductItem() {
  return (
    <div className={cx("wrapper")}>
      <img
        className={cx("image")}
        src="https://salt.tikicdn.com/cache/750x750/ts/product/f5/52/80/675e31a670afc560e7b0e46c0b65fb4f.png.webp"
        alt="product item"
      />
      <div className={cx("body")}>
        <p className={cx("desc")}>
          Apple iPhone 14 Apple iPhone 14 Pro Max iPhone 14 Pro Max App
        </p>
        <div className={cx("quality")}>
          <div className={cx("rating")}>
            4.5
            <FontAwesomeIcon className={cx("rating-start")} icon={faStar} />
          </div>
          <div className={cx("sold")}>Sold 999</div>
        </div>
        <div className={cx("cost")}>
          <div className={cx("price")}>200.000</div>
          <div className={cx("descrease")}>-20%</div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
