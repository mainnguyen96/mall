import classNames from "classnames/bind";

import Button from "../Button";
import styles from "./Location.module.css";

const cx = classNames.bind(styles);

function Location() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("location-header")}>
        <label className={cx("location-label")}>Delevery to</label>
        <Button label={"Change"} styles={"non-outline"} />
      </div>
      <div className={cx("info")}>
        <p className={cx("name")}>Nguyen Duc Chinh</p>
        <p className={cx("phone")}>0398289941</p>
      </div>
      <p className={cx("address")}>
        K82/12 Nguyen Luong Bang, Hoa Khanh Bac Ward, Lien Chieu District, Da
        Nang
      </p>
    </div>
  );
}

export default Location;
