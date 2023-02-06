import classNames from "classnames/bind";

import styles from "./Ship.module.css";

const cx = classNames.bind(styles);

const location = "Lien Chieu, Hoa Khanh, Da Nang";

function Ship() {
  return (
    <div className={cx("wrapper")}>
      Delivered to {location}
      <div className={cx("ship-method")}>
        <span className={cx("method")}></span>
        <span className={cx("time")}></span>
        <p className={cx("cost")}>Shipping: 12000</p>
      </div>
    </div>
  );
}

export default Ship;
