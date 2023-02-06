import classNames from "classnames/bind";

import icon from "~/assets/icons/ProductCateIcon/productCate.png";
import ProductCateItem from "./ProductCateItem";
import styles from "./ProductCate.module.css";

const cx = classNames.bind(styles);

function ProductCate() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>Today Suggestion</h3>
      <ul className={cx("category")}>
        <li className={cx("cate-item")}>
          <ProductCateItem label={"For you"} icon={icon} />
        </li>
        <li className={cx("cate-item")}>
          <ProductCateItem label={"For you"} icon={icon} />
        </li>
        <li className={cx("cate-item")}>
          <ProductCateItem label={"For you"} icon={icon} />
        </li>
        <li className={cx("cate-item")}>
          <ProductCateItem label={"For you"} icon={icon} />
        </li>
        <li className={cx("cate-item")}>
          <ProductCateItem label={"For you"} icon={icon} />
        </li>
        <li className={cx("cate-item")}>
          <ProductCateItem label={"For you"} icon={icon} />
        </li>
      </ul>
    </div>
  );
}

export default ProductCate;
