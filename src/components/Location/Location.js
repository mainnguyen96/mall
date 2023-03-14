import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { selectUserLocation } from "~/features/authSlice";

import Button from "../Button";
import styles from "./Location.module.css";

const cx = classNames.bind(styles);

function Location({ onChangeClick }) {
  const userLocation = useSelector(selectUserLocation);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("location-header")}>
        <label className={cx("location-label")}>Delevery to</label>
        <Button
          onClick={onChangeClick}
          label={"Change"}
          styles={"non-outline"}
        />
      </div>
      <div className={cx("info")}>
        <p className={cx("name")}>Nguyen Duc Chinh</p>
        <p className={cx("phone")}>0398289941</p>
      </div>
      <p className={cx("address")}>{userLocation?.label}</p>
    </div>
  );
}

export default Location;
