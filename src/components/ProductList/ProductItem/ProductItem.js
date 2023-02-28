import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import Star from "~/components/Star";
import styles from "./ProductItem.module.css";

const cx = classNames.bind(styles);

function ProductItem({ img, name, star, sold, price, discount, productId }) {
  const currency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  return (
    <div className={cx("wrapper")}>
      <Link to={`/product/${productId}`} className={cx("link")}>
        <img className={cx("image")} src={img[0]} alt="product item" />
        <div className={cx("body")}>
          <p className={cx("desc")}>{name}</p>
          <div className={cx("quality")}>
            <div className={cx("rating")}>
              {star}
              <Star rate={star} />
            </div>
            <div className={cx("sold")}>Sold {sold}</div>
          </div>
          <div className={cx("cost")}>
            <div className={cx("price")}>{currency}</div>
            <div className={cx("decrease")}>-{discount}%</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
