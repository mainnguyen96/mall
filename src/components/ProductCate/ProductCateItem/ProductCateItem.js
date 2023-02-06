import classNames from "classnames/bind";

import styles from "./ProductCateItem.module.css";

const cx = classNames.bind(styles);

function ProductCateItem({ icon, label }) {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("icon")} src={icon} alt="icon" />
      <p className={cx("label")}>{label}</p>
    </div>
  );
}

export default ProductCateItem;
