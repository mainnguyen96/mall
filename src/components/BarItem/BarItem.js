import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import Badge from "../Badge";
import styles from "./BarItem.module.css";

const cx = classNames.bind(styles);

function BarItem({ icon, label, type, location, onClick }) {
  return (
    <button className={cx("wrapper", type)} onClick={onClick}>
      <div className={cx("badge")}>
        <Badge />
      </div>
      {icon ? (
        typeof icon === "string" ? (
          <img className={cx("imgIcon")} alt="icon" src={icon} />
        ) : (
          <FontAwesomeIcon icon={icon} className={cx("faIcon")} />
        )
      ) : null}

      {label}
      {location && <span className={cx("location")}>{location}</span>}
    </button>
  );
}

export default BarItem;
