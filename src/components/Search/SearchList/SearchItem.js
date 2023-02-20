import classNames from "classnames/bind";

import styles from "./SearchList.module.css";

const cx = classNames.bind(styles);

function SearchItem({ img, name, sold }) {
  return (
    <div className={cx("item-wrapper")}>
      <img src={img} className={cx("item-img")} alt="icon" />
      <div className={cx("item-info")}>
        <h3 className={cx("item-name")}>{name}</h3>
        <p className={cx("item-num")}>{sold}</p>
      </div>
    </div>
  );
}

export default SearchItem;
