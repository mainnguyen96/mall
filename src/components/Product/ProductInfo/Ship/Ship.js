import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { selectUserLocation } from "~/features/authSlice";
import styles from "./Ship.module.css";

const cx = classNames.bind(styles);

function Ship() {
  const location = useSelector(selectUserLocation);
  return (
    <div className={cx("wrapper")}>
      Delivered to {location?.label}
      <div className={cx("ship-method")}>
        <span className={cx("method")}></span>
        <span className={cx("time")}></span>
        {/* <p className={cx("cost")}>Shipping: 12000</p> */}
      </div>
    </div>
  );
}

export default Ship;
