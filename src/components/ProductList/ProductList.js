import classNames from "classnames/bind";

import ProductItem from "../ProductItem";
import styles from "./ProductList.module.css";

const cx = classNames.bind(styles);

function ProductList() {
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("list")}>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
        <li className={cx("item")}>
          <ProductItem />
        </li>
      </ul>
    </div>
  );
}

export default ProductList;
